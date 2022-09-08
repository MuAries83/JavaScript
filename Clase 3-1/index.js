function calculoMeses(m1){
    var m1 = parseInt(document.getElementById("monto").value);
    let  p = (m1)/300;
    document.getElementById("calculo").innerText = p;
};