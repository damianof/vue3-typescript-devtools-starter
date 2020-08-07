export interface IChromeDevToolsHelper {
  onSelectionChanged(): Promise<any>
}

const privateChrome: any = (window as any).chrome
export const logger: any = {
  log(msg: string) {
    // TODO: uncomment this code only while debugging/developing. Uncomment before packing extension for deployment
    if (
      privateChrome &&
      privateChrome.devtools &&
      privateChrome.devtools.inspectedWindow
    ) {
      privateChrome.devtools.inspectedWindow.eval(
        `console.log("%c ChromeDevtoolsHelper: ${msg}", "background: cyan;");`
      )
    } else {
      console.log('ChromeDevtoolsHelper:', msg)
    }
  }
}

export interface IChromeDevToolsHelperOptions {
  panelName: string
  onShown: () => void
  onHidden: () => void
  onModelUpdated: (value: any) => void
}

/**
 * chrome.devtools helper
 */
export class ChromeDevToolsHelper implements IChromeDevToolsHelper {
  //private readonly privateChrome: any = (window as any).chrome
  private options!: IChromeDevToolsHelperOptions

  init(options: IChromeDevToolsHelperOptions) {
    this.options = options
    const self = this

    if (privateChrome && privateChrome.devtools) {
      const panels = privateChrome.devtools.panels

      panels.elements.createSidebarPane(options.panelName, (sidebar: any) => {
        sidebar.setPage('index.html')

        // add handlers for Panel shown/hidden
        sidebar.onShown.addListener(() => {
          // things you might have to do when panel is shown
          //options.onShown()
        })

        sidebar.onHidden.addListener(() => {
          // things you might have to do when panel is hidden
          //options.onHidden()
        })

        panels.elements.onSelectionChanged.addListener(() => {
          logger.log(`-- panels.elements.onSelectionChanged`)
          self.onSelectionChanged().then((value: any) => {
            options.onModelUpdated(value)
          })
        })
      })
    }
  }

  onSelectionChanged(): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      if (!privateChrome) {
        reject()
      } else {
        const invokedMethodExpression = `saveSelectedElement($0);`
        logger.log(
          `onSelectionChanged: invokedMethodExpression ${invokedMethodExpression}`
        )

        privateChrome.devtools.inspectedWindow.eval(
          invokedMethodExpression,
          {
            useContentScriptContext: true // run the code in the content-script
          },
          (result: string) => {
            resolve(result)
          }
        )
      }
    })
  }
}

export const chromeDevToolsHelper = new ChromeDevToolsHelper()
