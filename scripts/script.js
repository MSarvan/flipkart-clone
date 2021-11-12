function search(){
    let q = document.getElementById("searchbox").value;
    if(q != "")
    {
        fetch("https://api.airtable.com/v0/appfnClvZG34RFIeI/Table%201?fields%5B%5D=name",
        {
            method:'GET',
            headers:{'Authorization':'Bearer keyIkILcyVWkPItLt'}    
        }).then(function(res){
        return res.json(); 
        }).then(function(res){
            var list=res["records"];
            var ar=[];
            list.forEach((item)=>{
                var temp=item.fields.name;
                if(temp != undefined)
                {
                    ar.push(temp);                        
                }
            });
            let matching = [];
            let myPattern = new RegExp('(\\w*'+q+'\\w*)','gi');
            ar.forEach(el=>
            {
                if(el.match(myPattern))
                {
                    matching.push(el);
                }
            });
            if(matching.length != 0)
            {
                displayResults(matching);
            }
            else
            {
                output.innerHTML = null;
                output.style.display = "block";
                let failed_results = document.createElement('li');
                failed_results.innerText = "No Search Results Found";
                output.append(failed_results);
            }
        });
    }
    else{
        output.style.display = "none";
    }
}
var delay;
function debounce(fun,time)
{
    if(delay)
    {
        clearTimeout(delay);
    }
    delay = setTimeout(()=>{fun()},time);
}
function displayResults(p)
{
    output.innerHTML = null;
    output.style.display = "block";
    p.forEach(element => {
        let name = document.createElement('li');
        name.innerText = element;
        output.append(name);
    });

}
function toProductPage(p)
{
    console.log(p);
    // if(localStorage.getItem("Flip_product")===null)
    // {
    //     localStorage.setItem("Flip_product",[]);
    // }
    // let productToDisplay = JSON.parse(localStorage.getItem("Flip_product"));

    // if(productToDisplay.length != 0)
    // {
    //     while(productToDisplay.length==0)
    //     {
    //         productToDisplay.pop();
    //     }
    // }
    // productToDisplay.push(p);
    
    // localStorage.setItem("Flip_product",JSON.stringify(productToDisplay));

    // window.location.href = "productpage.html";
}

export {search,debounce,displayResults,toProductPage};