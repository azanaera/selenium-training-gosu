package mvp.guidewire.testing.ClaimCenter

uses org.openqa.selenium.By
uses org.openqa.selenium.Keys
uses org.openqa.selenium.WebDriver
uses org.openqa.selenium.WebElement
uses org.openqa.selenium.interactions.Actions
uses org.openqa.selenium.support.ui.ExpectedConditions
uses org.openqa.selenium.support.ui.WebDriverWait

public class Claim {

  private var _driver : WebDriver
  private var _wait : WebDriverWait

  private var _actions : Actions

  private var _hasFireDamage : boolean
  private var _hasWaterDamage : boolean

  private var _dwelling : boolean
  private var _otherStructure : boolean
  private var _propertyContents : boolean
  private var _livingExpenses : boolean

  public construct() {
    _driver = Application.CurrentDriver()
    _wait = new WebDriverWait(_driver, 30)

    _actions = new Actions(_driver)

    _hasFireDamage = false
    _hasWaterDamage = false
    _dwelling = false
    _otherStructure = false
    _propertyContents = false
    _livingExpenses = false

  }

  public function SelectPolicyVia(mode : String) {
    if (mode.equals("Find Policy")) {
      LoadFindPolicy()
    } else {
      LoadCreateUnverifiedPolicy()
    }
  }

  public function LoadFindPolicy() {
    _actions
        .moveToElement(_driver.findElement(By.id("FNOLWizard:FNOLWizard_FindPolicyScreen:ScreenMode_true-boxLabelEl")))
        .click()
        .perform()
  }

  public function LoadCreateUnverifiedPolicy() {
    var createUnverifiedPolicyButton = _wait.until(
        ExpectedConditions.visibilityOfElementLocated(By.id("FNOLWizard:FNOLWizard_FindPolicyScreen:ScreenMode_false-inputEl"))
    )

    _actions
        .moveToElement(createUnverifiedPolicyButton)
        .click()
        .perform()
  }

  @Override
  public function Load() {
    var claimTab = _wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("TabBar:ClaimTab")))

    _actions.moveToElement(claimTab)
        .moveByOffset(20, 0)
        .click()
        .sendKeys({Keys.ARROW_DOWN})
        .sendKeys({Keys.SPACE})
        .perform()
  }

  public function CreateUnverifiedPolicy(
      PolicyNumber : String,
      PolicyType : String,
      ClaimType : String,
      LossDate : String,
      EffectiveDate : String,
      ExpirationDate : String,
      LastName : String,
      FirstName : String
  ) {
    var format : String = "FNOLWizard:FNOLWizard_FindPolicyScreen:FNOLWizardFindPolicyPanelSet:%s-inputEl"
    var claimTypeTable = "FNOLWizard:FNOLWizard_FindPolicyScreen:FNOLWizardFindPolicyPanelSet:ClaimLossType-table"
    Application.SetValue(String.format(format, {"PolicyNumber"}), PolicyNumber)
    Application.SetDropdownValue(String.format(format, {"Type"}), PolicyType)
    Application.SetRadioButtonValue(claimTypeTable, ClaimType)
    Application.SetValue(String.format(format, {"Claim_LossDate"}), LossDate)
    Application.SetValue(String.format(format, {"NewClaimPolicyGeneralPanelSet:NewClaimPolicyGeneralDV:EffectiveDate"}), EffectiveDate)
    Application.SetValue(String.format(format, {"NewClaimPolicyGeneralPanelSet:NewClaimPolicyGeneralDV:ExpirationDate"}), ExpirationDate)

    SetInsuredName(FirstName, LastName)
  }

  public function NextStep() {
    Thread.sleep(500)
    Application.ClickButton("FNOLWizard:Next")
  }

  public function SetBasicInformation(
      ReportedVia : String,
      LastName : String,
      FirstName : String,
      RelationToInsured : String,
      DateReported : String) {
    var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_BasicInfoScreen:PanelRow:BasicInfoDetailViewPanelDV:%s-inputEl"

    Application.SetDropdownValue(String.format(format, {"HowReported"}), ReportedVia)
    Application.SetDropdownValue(String.format(format, {"ReportedBy_Name"}), String.format("%s %s", {FirstName, LastName}))
    Application.SetDropdownValue(String.format(format, {"Claim_ReportedByType"}), RelationToInsured)
    Application.SetValue(String.format(format, {"Notification_ReportedDate"}), DateReported)
  }

  public function AddPolicyLevelCoverage(policyLevelCoverage : PolicyLevelCoverage) {
    Application.ClickButton("FNOLWizard:FNOLWizard_FindPolicyScreen:FNOLWizardFindPolicyPanelSet:NewClaimPolicyGeneralPanelSet:PolicyCoverageListDetail:EditablePropertyPolicyCoveragesLV_tb:Add")
    var containerID : String = "FNOLWizard:FNOLWizard_FindPolicyScreen:FNOLWizardFindPolicyPanelSet:NewClaimPolicyGeneralPanelSet:PolicyCoverageListDetail:EditablePropertyPolicyCoveragesLV-body";
    var containerElement : WebElement = _wait.until(ExpectedConditions.presenceOfElementLocated(By.id(containerID)))
    var childTables = containerElement.findElements(By.tagName("table"))
    print(childTables.Count)

//    Thread.sleep(2000) // wait for the row to add.
//    _actions
//        .sendKeys({Keys.TAB})
//        .sendKeys({Keys.TAB})
//        .sendKeys({Keys.TAB})
//        .sendKeys({Keys.TAB})
//        .sendKeys({Keys.ENTER})
//        .sendKeys({policyLevelCoverage.GetNotes().toString()})
//        .sendKeys({Keys.chord({Keys.LEFT_SHIFT, Keys.TAB})})
//        .sendKeys({"${policyLevelCoverage.GetIncidentLimit()}"})
//        .sendKeys({Keys.chord({Keys.LEFT_SHIFT, Keys.TAB})})
//        .sendKeys({"${policyLevelCoverage.GetExposureLimit()}"})
//        .sendKeys({Keys.chord({Keys.LEFT_SHIFT, Keys.TAB})})
//        .sendKeys({"${policyLevelCoverage.GetDeductible()}"})
//        .sendKeys({Keys.chord({Keys.LEFT_SHIFT, Keys.TAB})})
//        .sendKeys({Keys.chord({Keys.LEFT_CONTROL, "a"})})
//        .sendKeys({policyLevelCoverage.GetType()})
//        .sendKeys({Keys.TAB})
//        .perform()
  }

  public function AddPolicyLevelCoverages(policyLevelCoverages : PolicyLevelCoverage[]) {
    for (pLvCov in policyLevelCoverages) {
      AddPolicyLevelCoverage(pLvCov)
    }
  }

  private function SetInsuredName(firstName : String, lastName : String) {
    var format = "FNOLWizard:FNOLWizard_FindPolicyScreen:FNOLWizardFindPolicyPanelSet:NewClaimPolicyGeneralPanelSet:NewClaimPolicyGeneralDV:Insured_Name:Insured_NameMenuIcon"
    var button = "NewContactPopup:ContactDetailScreen:ContactBasicsDV_tb:ContactDetailToolbarButtonSet:CustomUpdateButton"
    _actions
        .moveToElement(_driver.findElement(By.id(format)))
        .click()
        .sendKeys({Keys.SPACE})
        .perform()

    var template = "NewContactPopup:ContactDetailScreen:ContactBasicsDV:PersonNameInputSet:GlobalPersonNameInputSet:%s-inputEl"

    Application.SetValue(String.format(template, {"FirstName"}), firstName)
    Application.SetValue(String.format(template, {"LastName"}), lastName)

    _actions
        .moveToElement(_driver.findElement(By.id(button)))
        .click()
        .perform()
  }

  public function SetClaimInformation(Description : String, LossCause : String, IsIncidentOnly : boolean, HasFireDamage : boolean, HasWaterDamage : boolean) {
    var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:NewLossDetailsHomeownersDV:%s-inputEl"

    Application.SetValue(String.format(format, {"Description"}), Description)
    Application.SetDropdownValue(String.format(format, {"Claim_LossCause"}), LossCause)
    Application.ClickButton(String.format(format, {IsIncidentOnly ? "Status_IncidentReport_true" : "Status_IncidentReport_false"}))

    if (HasFireDamage) {
      Application.ClickCheckbox(String.format(format, {"DamageTypeChooser_option0"}))
      _hasFireDamage = true
    }

    if (HasWaterDamage) {
      Application.ClickCheckbox(String.format(format, {"DamageTypeChooser_option1"}))
      _hasWaterDamage = true
    }
  }

  public function SetLossLocation(City : String, State : String, IsWeatherRelated : boolean) {
    var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:NewLossDetailsHomeownersDV:%s"
    var address = "AddressDetailInputSetRef:CCAddressInputSet:globalAddressContainer:globalAddress:GlobalAddressInputSet:%s-inputEl"
    Application.SetValue(String.format(format, {String.format(address, {"City"})}), City)
    Application.SetDropdownValue(String.format(format, {String.format(address, {"State"})}), State)
    Application.ClickButton(String.format(format, {String.format("WeatherRelated_%s", {IsWeatherRelated ? "true" : "false"})}))
  }

  public function SetFireDamageDetails(
      IsArsonInvolved : boolean,
      FireSource : String,
      HowWasFireDiscovered : String,
      FireDeptResponded : boolean,
      IsAnyoneInjured : boolean,
      SmokeDamageOnly : boolean,
      IsHomeHabitable : boolean,
      IsHomeSecure : boolean
  ) {
    if (_hasFireDamage) {

      var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:FireDamageQuestionsPanelSet:FireDamageQuestionsPanelSet:%s-inputEl"
      Application.ClickButton(String.format(format, {String.format("ArsonInvolved_%s", {IsArsonInvolved ? "true" : "false"})}))
      Application.SetValue(String.format(format, {"FireSource"}), FireSource)
      Application.SetValue(String.format(format, {"HowWasFireDiscovered"}), HowWasFireDiscovered)
      Application.ClickButton(String.format(format, {String.format("FireDeptResponded_%s", {FireDeptResponded ? "true" : "false"})}))
      Application.ClickButton(String.format(format, {String.format("IsAnyoneInjured_%s", {IsAnyoneInjured ? "true" : "false"})}))
      Application.ClickButton(String.format(format, {String.format("SmokeDamageOnly_%s", {SmokeDamageOnly ? "true" : "false"})}))
      Application.ClickButton(String.format(format, {String.format("IsHomeHabitable_%s", {IsHomeHabitable ? "true" : "false"})}))
      Application.ClickButton(String.format(format, {String.format("IsHomeSecure_%s", {IsHomeSecure ? "true" : "false"})}))
    }
  }

  public function SetWaterDamageDetails(Source : String, Answer : boolean) {
    if (_hasWaterDamage) {
      var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:WaterDamageQuestionsPanelSet:WaterDamageQuestionsPanelSet:%s-inputEl"
      if (Source.equalsIgnoreCase("Plumbing Or Appliances")) {
        Application.ClickButton(String.format(format, {"WaterSource_option1"}))
        Application.ClickButton(String.format(format, {String.format("HasWaterBeenTurnedOff_%s", {Answer ? "true" : "false"})}))
      } else if (Source.equalsIgnoreCase("Roof")) {
        Application.ClickButton(String.format(format, {"WaterSource_option2"}))
        Application.ClickButton(String.format(format, {String.format("IsRoofCovered_%s", {Answer ? "true" : "false"})}))
      } else {
        Application.ClickButton(String.format(format, {"WaterSource_option3"}))
      }
    }
  }

  public function SetLossDetails(Dwelling : boolean, OtherStructure : boolean, PropertyContents : boolean, LivingExpenses : boolean) {
    var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:%s:_checkbox"

    _dwelling = Dwelling
    _otherStructure = OtherStructure
    _propertyContents = PropertyContents
    _livingExpenses = LivingExpenses

    if (Dwelling) {
      Application.ClickButton(String.format(format, {"DwellingInputGroup"}))
    }

    if (OtherStructure) {
      Application.ClickButton(String.format(format, {"OtherStructureInputGroup"}))
    }

    if (PropertyContents) {
      Application.ClickButton(String.format(format, {"PropertyContentsInputGroup"}))
    }

    if (LivingExpenses) {
      Application.ClickButton(String.format(format, {"LivingExpensesInputGroup"}))
    }
  }

  public function SetDwellingLossDetails(
      DwellingDamageDescription : String,
      RoomsDamaged : HashMap<RoomType, Integer>,
      DwellingMaterialsDamaged : String,
      DwellingEstimateReceived : boolean,
      DwellingAlreadyRepaired : boolean
  ) {
    if (_dwelling) {
      var format = "FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:DwellingInputGroup:%s-inputEl"
      Application.SetValue(String.format(format, {"DwellingDamageDescription"}), DwellingDamageDescription)
      Application.SetValue(String.format(format, {"DwellingMaterialsDamaged"}), DwellingMaterialsDamaged)

      Application.ClickButton(String.format(format, {String.format("DwellingEstimateReceived_%s", {DwellingEstimateReceived ? "true" : "false"})}))
      Application.ClickButton(String.format(format, {String.format("DwellingAlreadyRepaired_%s", {DwellingAlreadyRepaired ? "true" : "false"})}))

      for (type in RoomsDamaged.keySet()) {
        Application.ClickButton("FNOLWizard:AutoWorkersCompWizardStepSet:FNOLWizard_NewLossDetailsScreen:LossDetailsPanel:FNOLWizard_NewLossDetailsPanelSet:DwellingInputGroup:EditableRoomsLV_tb:Add")
        Thread.sleep(2000) // wait for the row to add.
        _actions
            .sendKeys({Keys.ENTER})
            .sendKeys({RoomsDamaged.get(type).toString()})
            .sendKeys({Keys.TAB})
            .sendKeys({Keys.chord({Keys.LEFT_CONTROL, "a"})})
            .sendKeys({Keys.BACK_SPACE})
            .sendKeys({type.AsString()})
            .sendKeys({Keys.TAB})
            .perform()
      }
    }
  }

  public function Finish() {
    Application.ClickButton("FNOLWizard:Finish")
  }
}