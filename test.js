var pdf2table = require('pdf2table');
var fs = require('fs');
 
function IsResultRow(row){
    var ar_len = row.length;
    return (ar_len==9);
}

function array_combine( keys, values ) {  
    // Creates an array by using the elements of the first parameter as keys and the elements of the second as the corresponding values    
    //   
    // version: 810.114  
    // discuss at: http://phpjs.org/functions/array_combine  
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  
    // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);  
    // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}  
     
    var new_array = {}, keycount=keys.length, i;  
  
    // input sanitation  
    if( !keys || !values || keys.constructor !== Array || values.constructor !== Array ){  
        return false;  
    }  
  
    // number of elements does not match  
    if(keycount != values.length){  
        return false;  
    }  
  
    for ( i=0; i < keycount; i++ ){  
        new_array[keys[i]] = values[i];  
    }  
  
    return new_array;  
}  

function GetHighestArrayCount(){

}

function extract_race_results(rows){
    var json_race_results = [];
    
    var simple_9_tab = rows.filter(IsResultRow); 
    var headers = simple_9_tab.shift();
    var comb_arr = array_combine(simple_9_tab[0],simple_9_tab);

    for(row9s in simple_9_tab){
        json_race_results[row9s] = array_combine(headers,simple_9_tab[row9s])
    }
    return json_race_results;
}


fs.readFile('./input/Resultat-DM2016-Slalom-12--r.pdf', function (err, buffer) {
    if (err) return console.log("ERR:"+err);
 
    pdf2table.parse(buffer, function (err, rows, rowsdebug) {
        if(err) return console.log(err);
 
        /*console.log(rows);
        for (row in rows) {
            text = row;
            //console.log("XX")
            console.log(row+":"+rows[row])
        }*/

        var json_race_results = extract_race_results(rows);
        console.log("File contained "+json_race_results.length+ " race results!")
       console.log("Done")
    });
});
