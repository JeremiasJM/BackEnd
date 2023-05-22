import fs from 'fs'
import __dirname from '../../utils.js'

class cartManager{
    
    constructor(){

        this.path=(__dirname+'/data/carts.json')
        
    }
    getProductsFromACart=(cid)=>{
        const cartToShow = this.getCartById(cid)
        if(cartToShow == -1){
            return false
        }
        return(cartToShow.products)
        
    }
    getCarts=()=>{
        const cartsList = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        return(cartsList)
    }
    getCartById=(cid)=>{
        const list= this.getCarts()
            const found= list.find(cart => cart.cid == parseInt(cid))

            if(found) return found
            return -1
    }

    generateId= ()=>{
        let list= this.getCarts()
        if(list.length === 0) return 1
        return list[list.length-1].cid +1
    }
    createCart = () =>{
        let list= this.getCarts()
        const cid= parseInt(this.generateId())
        const newCart= {cid, products:[]}
        console.log(list)

        list.push(newCart)
        fs.writeFileSync(this.path, JSON.stringify(list, null))
        console.log(`Cart ${parseInt(cid)} has been created`)
    }

    addProductToCart=(cid, pid)=>{
        let list= this.getCarts()
        const cIndex= list.findIndex(c => c.cid == parseInt(cid))
        
        const pIndex= list[cIndex].products.findIndex(x => x.pid == parseInt(pid))

        if(pIndex == -1){
            let objectToAdd={'pid': +pid, 'quantity': 1 }
            
            list[cIndex].products.push(objectToAdd)
            
        }else{
            
            list[cIndex].products[pIndex].quantity++
        }
        
        fs.writeFileSync(this.path, JSON.stringify(list, null))
        console.log(`The product ${pid} has been added to the cart ${cid}`)

    }
    

}

export default cartManager