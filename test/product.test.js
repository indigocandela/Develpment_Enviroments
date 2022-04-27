process.env.NODE_ENV ='test';

const Duck=require('../models/duck');
const chai=require('chai');
const expect =chai.expect;
const should =chai.should();
const chaiHttp =require('chai-http');
const server=require('../server');

chai.use(chaiHttp);
before((done)=> {
    Duck.deleteMany({},function(err) {});
    done();
});
after((done)=> {
    Duck.deleteMany({},function(err) {});
    done();
});

describe ('/First Test Collection',function(){


    it('test default API welcome route...',(done)=>{

        chai.request(server)
        .get('/api/welcome')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            done();
        
      });
    });

      it('should verify thath we have 0 ducks in the DB',(done)=>{
        chai.request(server)
        .get('/api/ducks')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.equal(0);
            done();
        });
    }); 

    it('creates a duck',(done)=>{

        let duck={
            name:"Test duck",
            color:"green",
            size:1000,
            price:10,
            inStock:true
        }
        chai.request(server)
        .post('/api/ducks')
        .send(duck)
        .end((err,res) => {
            res.should.have.status(201);
            done();
        });
    });
    it('should verify thath we have 1 ducks in the DB',(done)=>{
        chai.request(server)
        .get('/api/ducks')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.equal(1);
            done();
        });
    });

    

    it('should test two values....', function(){
        //actual test
        let expectedVal=10;
        let actualVal=10;

        expect(actualVal).to.be.equal(expectedVal);
    })
})