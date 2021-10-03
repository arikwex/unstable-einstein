export default (() => {
  var dist = 0;

  var a = {
    setDist: (a) => {dist = a;},
    getDist: (a) => {return dist;}
  };

  return a;
})();