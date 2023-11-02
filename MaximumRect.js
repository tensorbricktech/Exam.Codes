const maxNumRectangle = (L, B, l, b, rotate) => {
  let helper = new SlicingHelper();
  let test = helper.propsIdentifier(L, B, l, b, rotate);
  console.log(test);
};

class SlicingHelper {
  box = {};
  slice = (L, B, l, b, rotate) => {
    if (rotate == false) {
      this.box["containersize"] = L + "," + B;
      this.box["fillersize"] = l + "," + b;
      this.box["occupied_L"] = Math.floor(L / l) * l;
      this.box["occupied_B"] = Math.floor(B / b) * b;
      this.box["occupied"] =
        this.box["occupied_L"] + "," + this.box["occupied_B"];
      this.box["freeright_L"] = L - this.box["occupied_L"];
      this.box["freeright_B"] = B;
      this.box["freeright"] =
        this.box["freeright_L"] + "," + this.box["freeright_B"];
      this.box["freebottom_L"] = Math.floor(L / l) * l;
      this.box["freebottom_B"] = B - this.box["occupied_B"];
      this.box["freebottom"] =
        this.box["freebottom_L"] + "," + this.box["freebottom_B"];

      this.box["instance"] = Math.floor(L / l) * Math.floor(B / b);
      this.box["totalareausage"] = this.box["instance"] * (l * b);
      this.box["percentageused"] = (this.box["totalareausage"] / (L * B)) * 100;
    }
    if (rotate == true) {
      let swapper = L;
      L = B;
      B = swapper;

      this.box["containersize"] = L + "," + B;
      this.box["fillersize"] = l + "," + b;
      this.box["occupied_L"] = Math.floor(L / l) * l;
      this.box["occupied_B"] = Math.floor(B / b) * b;
      this.box["occupied"] =
        this.box["occupied_L"] + "," + this.box["occupied_B"];
      this.box["freeright_L"] = L - this.box["occupied_L"];
      this.box["freeright_B"] = B;
      this.box["freeright"] =
        this.box["freeright_L"] + "," + this.box["freeright_B"];
      this.box["freebottom_L"] = Math.floor(L / l) * l;
      this.box["freebottom_B"] = B - this.box["occupied_B"];
      this.box["freebottom"] =
        this.box["freebottom_L"] + "," + this.box["freebottom_B"];

      this.box["instance"] = Math.floor(L / l) * Math.floor(B / b);
      this.box["totalareausage"] = this.box["instance"] * (l * b);
      this.box["percentageused"] = (this.box["totalareausage"] / (L * B)) * 100;
    }
  };

  propsIdentifier = (L, B, l, b, rotate, memo = {}) => {
    if (l > L || b > B) {
      memo["Rotate"] = rotate;
      memo["Status"] = false;
      return { memo };
    } else {
      memo["Rotate"] = rotate;
      memo["Status"] = true;
      this.slice(L, B, l, b, memo["Rotate"]);

      if ("efficiency" in memo) {
        let percentremaining = 100 - memo["efficiency"];
        memo["efficiency"] +=
          (percentremaining * this.box["percentageused"]) / 100;
      } else {
        memo["efficiency"] = (this.box["totalareausage"] / (L * B)) * 100;
      }

      if ("numbRecurr" in memo) {
        memo["numbRecurr"] += 1;
        memo["totalinstance"] += this.box["instance"];
        memo["slice" + memo["numbRecurr"]] = {
          Size: this.box["containersize"],
          Occupied: this.box["occupied"],
          FreeBottom: this.box["freebottom"],
          FreeRight: this.box["freeright"],
          Box: this.box["instance"],
        };
      } else {
        memo["numbRecurr"] = 1;
        memo["totalinstance"] = this.box["instance"];
        memo["slice" + memo["numbRecurr"]] = {
          Size: this.box["containersize"],
          Occupied: this.box["occupied"],
          FreeBottom: this.box["freebottom"],
          FreeRight: this.box["freeright"],
          Box: this.box["instance"],
        };
      }

      if (this.box["freeright_L"] >= b) {
        this.propsIdentifier(this.box["freeright_L"], B, b, l, rotate, memo);
      } else {
      }

      if (this.box["freebottom_B"] >= b) {
        this.propsIdentifier(
          this.box["freebottom_L"],
          this.box["freebottom_B"],
          b,
          l,
          rotate,
          memo
        );
      } else {
      }

      return { memo };
    }
  };
}

const recNumOnDirect = (L, B, l, b, rotate, memo = {}) => {
  if (l > L || b > B) {
    memo["Rotate"] = rotate;
    memo["Status"] = false;
    return { memo };
  } else {
    memo["Rotate"] = rotate;
    memo["Status"] = true;
    helper = new SlicingHelper();
    helper.slice(L, B, l, b, memo["Rotate"]);

    if ("efficiency" in memo) {
      let percentremaining = 100 - memo["efficiency"];
      memo["efficiency"] +=
        (percentremaining * helper.box.percentageused) / 100;
    } else {
      memo["efficiency"] = (helper.box.totalareausage / (L * B)) * 100;
    }

    if ("numbRecurr" in memo) {
      memo["numbRecurr"] += 1;
      memo["totalinstance"] += helper.box.instance;
      memo["slice" + memo["numbRecurr"]] = {
        Size: helper.box.containersize,
        Occupied: helper.box.occupied,
        FreeBottom: helper.box.freebottom,
        FreeRight: helper.box.freeright,
        Box: helper.box.instance,
      };
    } else {
      memo["numbRecurr"] = 1;
      memo["totalinstance"] = helper.box.instance;
      memo["slice" + memo["numbRecurr"]] = {
        Size: helper.box.containersize,
        Occupied: helper.box.occupied,
        FreeBottom: helper.box.freebottom,
        FreeRight: helper.box.freeright,
        Box: helper.box.instance,
      };
    }

    if (helper.box.freeright_L >= b) {
      recNumOnDirect(helper.box.freeright_L, B, b, l, rotate, memo);
    } else {
    }

    if (helper.box.freebottom_B >= b) {
      recNumOnDirect(
        helper.box.freebottom_L,
        helper.box.freebottom_B,
        b,
        l,
        rotate,
        memo
      );
    } else {
    }

    return { memo };
  }
};

const recNumOnFlip = (L, B, l, b, rotate, memo = {}) => {
  if (l > B || b > L) {
    memo["Flip"] = "Flip";
    memo["Status"] = false;
    return { memo };
  } else {
    memo["Flip"] = "Flip";
    memo["Status"] = true;
    helper = new SlicingHelper();
    helper.slice(L, B, l, b);
    memo["Flip"] = true;
    let numOnFlipDirection = Math.floor(B / l) * Math.floor(L / b);
    // console.log(numOnFlipDirection);
    let flipLengthLeft = B - Math.floor(B / l) * l;
    let flipBreadthLeft = L - Math.floor(L / b) * b;

    // console.log(
    //   "Length left: " + flipLengthLeft + " Breadth left: " + flipBreadthLeft
    // );
    let totalAreaUse = numOnFlipDirection * (l * b);
    if ("efficiency" in memo) {
      let percentusage = (totalAreaUse / (L * B)) * 100;
      let percentremaining = 100 - memo["efficiency"];
      memo["efficiency"] += (percentremaining * percentusage) / 100;
      console.log("efficiency: " + memo["efficiency"].toFixed(2) + "%");
    } else {
      memo["efficiency"] = (totalAreaUse / (L * B)) * 100;
      console.log("efficiency: " + memo["efficiency"].toFixed(2) + "%");
    }

    if ("numbRecurr" in memo) {
      memo["numbRecurr"] += 1;
      memo["slice" + memo["numbRecurr"]] =
        Math.floor(B / b) * b + "," + Math.floor(L / l) * l;
    } else {
      memo["numbRecurr"] = 1;
      memo["slice" + memo["numbRecurr"]] =
        Math.floor(B / l) * l + "," + Math.floor(L / b) * b;
    }

    if (flipLengthLeft >= b) {
      recNumOnFlip(flipLengthLeft, B, b, l, memo);
    }
    return { memo };
  }
};

// maxNumRectangle(5, 3, 3, 1);
// maxNumRectangle(11, 7, 5, 3);
maxNumRectangle(17, 8, 7, 3, false);
