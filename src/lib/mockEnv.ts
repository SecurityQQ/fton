import { mockTelegramEnv, parseInitData, retrieveLaunchParams } from '@tma.js/sdk';

export const setupMockTelegramEnv = () => {
  // It is important to mock the environment only for development purposes.
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    let shouldMock: boolean;

    // Try to extract launch parameters to check if the current environment is Telegram-based.
    try {
      // If we are able to extract launch parameters, it means that we are already in the
      // Telegram environment. So, there is no need to mock it.
      retrieveLaunchParams();

      // If we previously mocked the environment, we should do it again.
      // This ensures the mock is reapplied if the page is reloaded.
      shouldMock = !!sessionStorage.getItem('____mocked');
    } catch (e) {
      shouldMock = true;
    }

    if (shouldMock) {
      const initDataRaw = new URLSearchParams([
        [
          'user',
          //   JSON.stringify({
          //   id: 208206100,
          //   first_name: 'Alex',
          //   last_name: 'M',
          //   username: 'aleksandr_malyshev',
          //   language_code: 'en',
          //   is_premium: true,
          //   allows_write_to_pm: true,
          // }),
          JSON.stringify({
            id: 99281932,
            first_name: 'Andrew',
            last_name: 'Rogou',
            username: 'Rogou',
            language_code: 'en',
            is_premium: true,
            allows_write_to_pm: true,
          }),
        ],
        ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
        ['auth_date', '1716922846'],
        ['start_param', 'debug'],
        ['chat_type', 'sender'],
        ['chat_instance', '8428209589180549439'],
      ]).toString();

      mockTelegramEnv({
        themeParams: {
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
          textColor: '#f5f5f5',
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: '7.2',
        platform: 'tdesktop',
      });
      sessionStorage.setItem('____mocked', '1');

      console.info(
        'As the current environment was not considered Telegram-based, it was mocked. Note that you should not do this in production. Environment mocking is only applied in development mode. After building the application, you will not see this behavior and related warning.'
      );
    }
  }
};
