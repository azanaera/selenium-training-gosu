package mvp.guidewire.testing.ClaimCenter

uses org.openqa.selenium.By
uses org.openqa.selenium.WebElement
uses org.openqa.selenium.support.ui.ExpectedConditions
uses org.testng.annotations.*;

class ClaimCenterTest {
  @Test
  public function Run() {
    try {
      var app = new Application()
      app.Login("su", "gw")

      var c = new Claim()
      c.Load()
      c.SelectPolicyVia("Create Unverified Policy")
      c.CreateUnverifiedPolicy("123456", "Homeowners", "Property", "07/15/2018", "01/01/2018", "01/01/2019", "Terrado", "Luis John")
//      c.AddPolicyLevelCoverages(
//          new PolicyLevelCoverage[]{
//              new PolicyLevelCoverage("Fire Dwelling", 1000bd, 1000bd, 1000bd, "Test"),
//              new PolicyLevelCoverage("Fire Dwelling Loss Of Use", 1000.0bd, 1000.0bd, 1000.0bd, "Test")
//          }
//      )

      c.NextStep()
      c.SetBasicInformation("Internet", "Terrado", "Luis John", "Self/Insured", "07/26/2018")
      c.NextStep()

      c.SetClaimInformation("Test Description", "Fire", true, true, false)
      c.SetFireDamageDetails(true, "Test Source", "It's hot..", true, false, false, true, true)
      c.SetWaterDamageDetails("Roof", true)
      c.SetLossDetails(true, false, false, false)

      var rooms = new HashMap<RoomType, Integer>()
      rooms.put(RoomType.BATHROOM, 2)
      rooms.put(RoomType.BEDROOM, 3)
      rooms.put(RoomType.LIVINGROOM, 1)

      c.SetDwellingLossDetails("Test", rooms, "None.", true, true)
      c.SetLossLocation("Los Angeles", "California", false) // proceed to step4

      c.NextStep()
      c.NextStep()
      c.Finish()

    } catch (e : Exception) {
      e.printStackTrace()
    }
  }
}