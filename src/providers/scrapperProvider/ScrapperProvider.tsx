import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useRef,
  RefObject,
  useEffect,
} from 'react';
import {View} from 'react-native';
import {uniqueId} from 'lodash';
import WebView from 'react-native-webview';
import ScrapperProcessor from './ScrapperProcessor';
import ScrapperTaskQueue from './ScrapperTaskQueue';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';

export interface ScrapTask {
  id: string;
  uri: string;
  hook: string;
  timeoutId: NodeJS.Timeout;
  resolver: (result: string) => void;
  rejector: (message: string) => void;
}

interface ScrapProcess {
  ref: RefObject<WebView>;
  task: ScrapTask | undefined;
  isProcessing: boolean;
}

export type ScrapperContextType = {
  scrap: <T>(
    uri: string,
    hook: string,
    options?: {
      timeout?: number;
    },
  ) => Promise<T>;
};

export const ScrapperContext = createContext<ScrapperContextType>({} as any);

interface ScrapperProviderProps extends PropsWithChildren {
  scrapperCount: number;
}

const ScrapperProvider = (props: ScrapperProviderProps) => {
  const taskQueue = useRef<ScrapperTaskQueue<ScrapTask>>(new ScrapperTaskQueue());

  const processListRef = useRef<ScrapProcess[]>();
  const [processList, setProcessList] = useState<ScrapProcess[]>([]);

  const scrap = useCallback(
    async (
      _uri: string,
      _hook: string,
      _options: {
        timeout?: number;
      },
    ): Promise<any> => {
      try {
        const result = await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            // 1. Queue 에서 Task 제거
            taskQueue.current?.remove(task);

            // 2. 실행중인 Processor 중단
            stopAndResetTargetProcessor(task);

            reject('timeout');

            processNextTask();
          }, _options?.timeout || 10000);

          const task: ScrapTask = {
            id: uniqueId('scrap_task_'),
            uri: _uri,
            hook: _hook,
            timeoutId,
            resolver: resolve,
            rejector: reject,
          };

          taskQueue.current.enqueue(task);
        });

        return result;
      } catch (error) {
        console.error(`ScrapperProvider.error: ${error}`);
        throw error;
      }
    },
    [],
  );

  const contextValue = useMemo<ScrapperContextType>(
    () => ({
      //@ts-ignore
      scrap,
    }),
    [scrap],
  );

  // ScrapperProvider 초기화
  useEffect(() => {
    // 1. 전달된 scrapperCount 개수만큼 Processor 준비
    const processList = Array(props.scrapperCount)
      .fill(0)
      .map(() => {
        return {
          ref: React.createRef<WebView>(),
          isProcessing: false,
          task: undefined,
        };
      });

    setProcessList(processList);

    processListRef.current = processList;

    // 2. TaskQueue 이벤트 초기화
    taskQueue.current.removeAllListeners();
    taskQueue.current.addListener('enqueue', () => {
      processNextTask();
    });
  }, [props.scrapperCount]);

  // TaskQueue와 Processor 상태를 확인 한 뒤, 다음 Task를 실행시키는 함수
  const processNextTask = useCallback(() => {
    const idleProcess = (processListRef.current || []).find((status) => !status.isProcessing);

    if (!idleProcess) {
      // 처리 가능한 WebView가 없는 경우
      return;
    }

    idleProcess.isProcessing = true; // @TODO Race Condition 방지

    const task = taskQueue.current?.dequeue();

    if (!task) {
      // 처리할 Task가 없는 상황

      idleProcess.isProcessing = false; // @TODO Race Condition 방지
      return;
    }

    idleProcess.task = task;

    const updatdedProcessList = Array.from(processListRef.current || []).map((status) => status);

    processListRef.current = updatdedProcessList;

    setProcessList(updatdedProcessList);
  }, []);

  // 전달 받은 Task를 수행중인 Processor를 찾아내고 중단 시킨 뒤, Processor 사용가능하도록 Reset
  const stopAndResetTargetProcessor = useCallback((task: ScrapTask) => {
    const updatedProcessList = (processListRef.current || []).map((status) => {
      if (status.task?.id === task.id) {
        status.ref.current?.stopLoading();
        status.isProcessing = false;
        status.task = undefined;
      }

      return status;
    });

    processListRef.current = updatedProcessList;
    setProcessList(updatedProcessList);
  }, []);

  // 스크랩 성공시 실행되는 핸들러
  const onSuccess = useCallback((task: ScrapTask, result: string) => {
    stopAndResetTargetProcessor(task);

    task.resolver(result);

    processNextTask();
  }, []);

  // 스크랩 실패시 실행되는 핸들러
  const onFailure = useCallback((task: ScrapTask, result: string) => {
    stopAndResetTargetProcessor(task);

    task.rejector(result);

    processNextTask();
  }, []);

  return (
    <ScrapperContext.Provider value={contextValue}>
      <View style={{width: 0, height: 0}}>
        {processList.map((process, idx) => {
          return (
            <ScrapperProcessor
              key={idx}
              webViewRef={process.ref}
              task={process.task}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
          );
        })}
      </View>
      {props.children}
    </ScrapperContext.Provider>
  );
};

export default ScrapperProvider;
