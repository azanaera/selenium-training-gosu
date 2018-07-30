package mvp.guidewire.testing.ClaimCenter/**
 * Created by ajamiscosa on July 27, 2018.
 */

uses org.apache.log4j.BasicConfigurator
uses org.apache.log4j.LogManager
uses org.apache.log4j.Logger
uses org.openqa.selenium.By
uses org.openqa.selenium.Keys
uses org.openqa.selenium.WebDriver
uses org.openqa.selenium.WebElement
uses org.openqa.selenium.chrome.ChromeDriver
uses org.openqa.selenium.interactions.Actions
uses org.openqa.selenium.support.ui.ExpectedConditions
uses org.openqa.selenium.support.ui.WebDriverWait

uses org.testng.annotations.BeforeTest

public class Application {
  private static var _driver : WebDriver
	private var _baseurl : String = "http://72.52.222.78:8080/cc/ClaimCenter.do"
//	private final String _baseurl = "http://10.90.140.53:8180/pc/PolicyCenter.do"
  private static var _actions : Actions
  private static var _wait : WebDriverWait
  private static var _logger : Logger
//  private var _baseurl : String = "http://10.90.140.124:8080/cc/ClaimCenter.do"

  public static function CurrentDriver() : WebDriver {
    return _driver
  }

  public static function SetValue(field : String, value : String) {
    _logger.info("Action: SetValue")
    var element : WebElement = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(field)))
    element.clear()

    _actions
        .moveToElement(element)
        .click()
        .sendKeys({value})
        .perform()

    _logger.info("Element ID: ${field}")
    _logger.info("Value: ${value}")
  }

  public static function SetDropdownValue(field : String, value : String) {
    _logger.info("Action: SetDropdownValue")
    var element : WebElement = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(field)))
    element.clear()

    _actions
        .moveToElement(element)
        .click()
        .perform()

    Thread.sleep(500)

    _actions
        .sendKeys({value})
        .sendKeys({Keys.TAB})
        .perform()

    Thread.sleep(1000)

    _logger.info("Element ID: ${field}")
    _logger.info("Value: ${value}")
  }

  public static function SetRadioButtonValue(containerTableID : String, value : String) {
    _logger.info("Action: SetRadioButtonValue")
    var table : WebElement = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(containerTableID)))

    var tableRows : List<WebElement> = table.findElements(By.tagName("tr"))

    var elementID : String = containerTableID.substring(0, containerTableID.lastIndexOf('-'))

    for (num in tableRows index i) {
      var radioButtonLabelElement : WebElement = _wait.until(ExpectedConditions.elementToBeClickable(By.id("${elementID}_option${i}-boxLabelEl")))
      if (radioButtonLabelElement != null) {
        if (radioButtonLabelElement.getText().equals(value)) {
          var radioButtonElement : WebElement = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("${elementID}_option${i}-inputEl")))
          radioButtonElement.click()

          _logger.info("Element ID: ${elementID}_option${i}-inputEl")
          _logger.info("Value: ${value}")
        }
      }
    }

    Thread.sleep(1000)
  }

  public static function ClickButton(buttonID : String) {
    _logger.info("Action: ClickButton")
    var button : WebElement = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(buttonID)))
    _actions
        .moveToElement(button)
        .click()
        .perform()

    _logger.info("Element ID: ${buttonID}")
  }

  public static function ClickCheckbox(buttonID : String) {
    _logger.info("Action: ClickCheckbox")
    var button : WebElement = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(buttonID)))
    _actions
        .moveToElement(button)
        .sendKeys({Keys.SPACE})
        .perform()

    _logger.info("Element ID: ${buttonID}")
  }

  @BeforeTest
  public function Initialize() {
    BasicConfigurator.configure()
    System.setProperty("webdriver.chrome.driver", "chromedriver.exe")

    _driver = new ChromeDriver()
    _driver.get(_baseurl)

    _wait = new WebDriverWait(_driver, 30)

    _actions = new Actions(_driver)
    _logger = LogManager.getLogger(this.Class.getName())
  }

  public function Login(username : String, password : String) {
    var userField : WebElement = _driver.findElement(By.id("Login:LoginScreen:LoginDV:username-inputEl"))
    var passField : WebElement = _driver.findElement(By.id("Login:LoginScreen:LoginDV:password-inputEl"))

    userField.sendKeys({username})
    passField.sendKeys({password})

    var button : WebElement = _driver.findElement(By.id("Login:LoginScreen:LoginDV:submit"))

    button.click()
  }
}