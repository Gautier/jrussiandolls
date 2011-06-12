$("#buildings").russiandolls({
    url: "/rooms.json",
    paramName: "id",
    child: jQuery("#rooms"),
    labelName: "name",
    emptyMsg: "No rooms found in this building"
});
