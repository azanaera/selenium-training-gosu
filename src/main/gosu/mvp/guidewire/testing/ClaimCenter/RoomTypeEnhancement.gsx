package mvp.guidewire.testing.ClaimCenter

enhancement RoomTypeEnhancement : RoomType {
  function AsString() : String{
    switch(this) {
      case BATHROOM: 	return "Bathroom";
      case BEDROOM: 	return "Bedroom";
      case GARAGE: 	return "Garage";
      case KITCHEN: 	return "Kitchen";
      case LIVINGROOM:return "Living Room";
      default: return "Other";
    }
  }
}
