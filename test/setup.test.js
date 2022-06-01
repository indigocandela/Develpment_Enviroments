
const Duck=require('../models/duck');
const Tamer=require('../models/tamer');

before((done)=> {
    Duck.deleteMany({},function(err) {});
    Tamer.deleteMany({},function(err) {});
    done();
});
after((done)=> {
    //Duck.deleteMany({},function(err) {});
    //Tamer.deleteMany({},function(err) {});
    done();
});