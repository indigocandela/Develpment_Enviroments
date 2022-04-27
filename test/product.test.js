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
    //Duck.deleteMany({},function(err) {});
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
    it('it should GET the Duck  by the given id', (done) => {
        let duck = new Duck({ name:"Test duck 2 ",color:"green",size:1000,price:10, inStock:true });
        duck.save((err, duck) => {
           chai.request(server)
          .get('/api/ducks/' + duck.id)
          .send(duck)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('color');
                res.body.should.have.property('size');
                res.body.should.have.property('price');
                res.body.should.have.property('_id').eql(duck.id);
            done();
          });
        });

    });

    it('it should UPDATE a duck given the id', (done) => {
        let duck = new Duck({name:"Test duck 3 ",color:"red",size:100,price:25, inStock:true })
        duck.save((err, duck) => {
              chai.request(server)
              .put('/api/ducks/' + duck.id)
              .send({name:"Test duck 3 updt ",color:"red",size:100,price:25, inStock:true })
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Duck was succesesfully updated.');
                    //res.body.duck.should.have.property('price').eql(25);
                done();
              });
        });
    });

    it('it should DELETE a duck given the id', (done) => {
        let duck = new Duck({name:"Test duck 4 ",color:"orange",size:100,price:25, inStock:true })
        duck.save((err, duck) => {
              chai.request(server)
              .delete('/api/ducks/' + duck.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Duck was succesesfully deleted.');
                done();
              });
        });
    });
});


    
