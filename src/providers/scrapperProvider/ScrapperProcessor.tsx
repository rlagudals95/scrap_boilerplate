import React, { memo, RefObject, useCallback } from 'react';
import {
  WebViewErrorEvent,
  WebViewNavigationEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';
import WebView from 'react-native-webview';
import { ScrapTask } from './ScrapperProvider';

const ScrapperProcessor = (props: {
  webViewRef: RefObject<WebView>;
  task: ScrapTask | undefined;
  onSuccess: (task: ScrapTask, result: string) => void;
  onFailure: (task: ScrapTask, result: string) => void;
}) => {
  // 스크랩 수행시 이벤트 발생 순서 LoadStart -> onLoad -> onLoadEnd -> onMessage -> onLoad -> onLoadEnd -> onMessage

  const onLoadEnd = useCallback(
    (_: WebViewNavigationEvent | WebViewErrorEvent) => {
      try {
        if (!props.task) {
          return;
        }

        props.webViewRef.current?.stopLoading();

        // Webview 로딩 완료
        const jsCode = `
            try {
              function hook() {${props.task.hook}}
              window.ReactNativeWebView.postMessage(JSON.stringify(hook()));
            } catch(e) {
              window.ReactNativeWebView.postMessage(JSON.stringify(e.message));
            }
          `;

        props.webViewRef.current?.injectJavaScript(jsCode);
      } catch (error: any) {
        console.error(`Processor.onLoadEnd.error: ${error}`);

        if (props.task) {
          if (props.task.timeoutId) {
            clearTimeout(props.task.timeoutId);
          }

          props.onFailure(props.task, error);
        }
      }
    },
    [props.task, props.onSuccess, props.onFailure]
  );

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        if (!props.task) {
          return;
        }

        props.webViewRef.current?.stopLoading();

        const data = event.nativeEvent.data;

        if (data === 'undefined' || data === '[]') {
          return;
        }

        if (props.task.timeoutId) {
          clearTimeout(props.task.timeoutId);
        }

        const result = JSON.parse(event.nativeEvent.data);

        props.onSuccess(props.task, result);
      } catch (error: any) {
        console.error(`Processor.onMessage.error: ${error}`);

        if (props.task) {
          if (props.task.timeoutId) {
            clearTimeout(props.task.timeoutId);
          }

          props.onFailure(props.task, error);
        }
      }
    },
    [props.task, props.onSuccess, props.onFailure]
  );

  const onError = useCallback(
    (event: WebViewErrorEvent) => {
      props.webViewRef.current?.stopLoading();

      if (props.task) {
        if (props.task.timeoutId) {
          clearTimeout(props.task.timeoutId);
        }

        props.onFailure(props.task, event.nativeEvent.description);
      }
    },
    [props.task, props.onSuccess, props.onFailure]
  );

  return (
    <WebView
      style={{ width: 1, height: 1 }}
      ref={props.webViewRef}
      source={{ uri: props.task?.uri || '' }}
      cacheEnabled={true}
      sharedCookiesEnabled
      onLoadEnd={onLoadEnd}
      onMessage={onMessage}
      onError={onError}
    />
  );
};

export default memo(ScrapperProcessor);
