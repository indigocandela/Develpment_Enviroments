process.env.NODE_ENV ='test';

const chai=require('chai');
const expect =chai.expect;
const should =chai.should();
const chaiHttp =require('chai-http');
const assert=chai.assert

chai.use(chaiHttp);



describe ('Unit Testing',function(){
    
    it('test the sum of two numbers',()=>{

       let number1=5;
       let number2=5;
       let sum=10;

       expect(sum).to.be.equal(number1+number2);  
      });
      it('test the subtraction of two numbers',()=>{

        let number1=8;
        let number2=3;
        let sub=5;
 
        expect(sub).to.be.equal(number1-number2);  
       });
       it('test the multiplication of two numbers',()=>{

        let number1=5;
        let number2=5;
        let mul=25;
 
        expect(mul).to.be.equal(number1*number2);  
       });
       it('test the division of two numbers',()=>{

        let number1=35;
        let number2=7;
        let div=5;
 
        expect(div).to.be.equal(number1/number2);  
       });
       it('test a more complicated math problem',()=>{

        let number1=12;
        let number2=6;
        let number3=8;
        let result=3;
       let ftask=(number1*number2)/number3;//9
       let stask=(ftask/3)*5*2//30
 
        expect(result).to.be.equal(stask/(ftask+1));  
       });
       it('test the complicated math problem',()=>{

        let number1=12;
        let number2=6;
        let number3=8;
        let result=4;
       let ftask=(number1*number2)/number3;//9
       let stask=(ftask/3)*5*2//30
 
        expect(result).not.to.be.equal(stask/(ftask+1));  
       });
       it('test to check assert from chai',()=>{

        let string1='hello';
        let string2='should';
 
        assert.typeOf(string1, 'string'); // withot the optional message
        assert.equal(string1, 'hello', 'string1 is equal to `hello`');
        assert.lengthOf(string2, 6, 'should has 6 letters');
      //  assert.lengthOf(string2, 2, 'should has 6 letters not 2');
       });
       it('test to check should() from chai',()=>{

        let string1='wow';
        let string2='DAMN';
        let collection={uf:'lol'}

        string1.should.be.a('string');
        string2.should.equal('DAMN');
        collection.should.have.property('uf').with.lengthOf(3);
        
       })

});