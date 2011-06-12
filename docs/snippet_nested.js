$("#buildings2").russiandolls({
    root: true,
    url: "/buildings.json",
    paramName: "id",
    labelName: "name",
    emptyMsg: "No building found"
});

$("#buildings2").russiandolls({
    url: "/rooms.json",
    paramName: "id",
    child: jQuery("#rooms2"),
    labelName: "name",
    emptyMsg: "No rooms found in this building"
});

$("#rooms2").russiandolls({
    url: "/cupboards.json",
    paramName: "id",
    child: jQuery("#cupboards"),
    labelName: "name",
    emptyMsg: "No cupboards found in this room"
});
