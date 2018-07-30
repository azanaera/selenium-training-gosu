package mvp.guidewire.testing.ClaimCenter
uses java.math.BigDecimal

class PolicyLevelCoverage {

  private var _type : String
  private var _deductible : BigDecimal
  private var _exposureLimit : BigDecimal
  private var _incidentLimit : BigDecimal
  private var _notes : String

  public construct(
      Type : String,
      Deductible : BigDecimal,
      ExposureLimit : BigDecimal,
      IncidentLimit : BigDecimal,
      Notes : String
  ) {
    _type = Type
    _deductible = Deductible
    _exposureLimit = ExposureLimit
    _incidentLimit = IncidentLimit
    _notes = Notes
  }

  public function GetType() : String {
    return _type
  }

  public function GetDeductible() : BigDecimal {
    return _deductible
  }

  public function GetExposureLimit() : BigDecimal {
    return _exposureLimit
  }

  public function GetIncidentLimit() : BigDecimal {
    return _incidentLimit
  }

  public function GetNotes() : String {
    return _notes
  }
}