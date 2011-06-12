var fs = require("fs");

var buildings = [
  {id:"building1", name: "Building I", 
    rooms : [{id: 1, name: "room a", 
              cupboards: [{id: 1, name: "cupboard green"},
                          {id: 2, name: "cupboard yellow"}]
             },
             {id: 2, name: "room b",
              cupboards: [{id: 3, name: "cupboard black"},
                          {id: 4, name: "cupboard white"}]
             }
    ]
  },
  {id:"building2", name: "Building II", 
    rooms : [{id: 1, name: "room c", 
              cupboards: [{id: 5, name: "cupboard room c"},
                          {id: 6, name: "other cupboard room c"}]
             },
             {id: 2, name: "room d",
              cupboards: [{id: 7, name: "cupboard room d"},
                          {id: 8, name: "last cupboard"}]
             }
    ]
  },
  {id:"building3", name: "Building III (empty)", rooms : []}
];

                       
function makeDot() {
  function quote (s) {
    return "\"" + s + "\"";
  }

  var dotStr = "digraph G {rankdir=LR;";

  for (var i = 0; i < buildings.length; i++) {
    var building = buildings[i];
    for (var j = 0; j < building.rooms.length; j++) {
      var room = building.rooms[j];
      dotStr += building.name + "->" + quote(room.name) + ";";
      for (var k = 0; k < room.cupboards.length; k++) {
        var cupboard = room.cupboards[k];
        dotStr += quote(room.name) + "->" + quote(cupboard.name) + ";";
      }
    }
  }
  dotStr += "building3;}";
  fs.writeFile("data.dot", dotStr);
}


function getBuildingById(arr, id) {
  for (var buildingId in arr) {
    if (arr[buildingId].id == id) {
      return arr[buildingId];
    }
  }
}

function getRoomById(arr, id) {
  for (var buildingId in arr) {
    var building = arr[buildingId];
    for (var roomId in building.rooms) {
      var room = building.rooms[roomId];
      if (room.id == id) {
        return room;
      }
    }
  }
}

exports.buildings = buildings;
exports.getBuildingById = getBuildingById;
exports.getRoomById = getRoomById;

