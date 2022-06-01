process.env.NODE_ENV ='test';

const chai=require('chai');
const expect =chai.expect;
const should =chai.should();
const chaiHttp =require('chai-http');
const assert=chai.assert

chai.use(chaiHttp);

describe ('Integration Testing',function(){

    it('test one function',()=>{

        const function1 =function(num1,num2){
            return num1+num2;
        }
        const result=10
        expect(result).to.be.equal(function1(7,3));  
       });
      
       it('test two functions',()=>{

        const function1 =function(num1,num2){
            return num1+num2;
        }
        const function2 =function(num1,num2){
            return num1-num2;
        }
        const result=10
        expect(result).to.be.equal(function1(7,3));
        expect(result).to.be.equal(function2(30,20));
       });

       it('test two functions combined',()=>{

        const function1 =function(num1,num2){
            return num1+num2;
        }
        const function2 =function(num1,num2){
            return num1-num2;
        }
        const result=10
        const result2=0
        expect(result).to.be.equal(function1(7,3));
        expect(result).to.be.equal(function2(30,20));
        expect(result2).to.be.equal(function2(30,20)-function1(7,3));
       });
       it('test two functions with another function',()=>{

        const function1 =function(num1,num2){
            return num1+num2;
        }
        const function2 =function(num1,num2){
            return num1-num2;
        }
        const function3 =function(){
           let res1=function1(10,5);
           let res2=function2(10,5);
           return res1/res2;
        }
        const result=3
        expect(result).to.be.equal(function3());
        
       });

});