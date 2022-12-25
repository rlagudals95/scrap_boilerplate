
const jsCode = `
    return new Promise((resolve, reject) => {
        const tokenInputElem = document.querySelector('#glowValidationToken');
        const token = tokenInputElem && tokenInputElem.value;

        const queryMap = {
            selectedLocationType: '',
            selectedLocationValue: '',
            deviceType: 'mobile',
            pageType: 'gateway-phone-web',
            actionSource: 'mobile-web-subnav',
            storeContext: 'NoStoreName',
        };

        const query = Array.from(Object.entries(queryMap))
            .map(([key, value]) => {
                return key + '=' + value
            })
            .join('&')

        fetch('https://' + domain + '/portal-migration/hz/glow/get-rendered-address-selections?' + query, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'anti-csrftoken-a2z': token,
            }
        })
        .then((response) => response.text(), () => reject())
        .then((data) => {
            const csrfToken = data.match(/CSRF_TOKEN : "(.+?)"/g)[0].split(":")[1].replace(/(\"| )/g, "");
            const body = {
                actionSource: 'glow',
                deviceType: 'mobileWeb',
                locationType: 'LOCATION_INPUT',
                pageType: 'gateway-phone-web',
                storeContext: 'NoStoreName',
                zipCode: zipCode + ''
            };

            fetch('https://' + domain + '/portal-migration/hz/glow/address-change?actionSource=glow', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'anti-csrftoken-a2z': csrfToken,
                    'x-requested-with': 'XMLHttpRequest'
                },
                body: JSON.stringify(body)
            })
            .then(() => {
                fetch('https://' + domain + '/portal-migration/hz/glow/get-location-label?storeContext=NoStoreName&pageType=gateway-phone-web&actionSource=mobile-web-subnav', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    resolve();
                }, () => reject());
            }, () => reject())
        }, () => reject());

    });
`;

export default jsCode;


