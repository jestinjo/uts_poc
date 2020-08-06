

function infoClick(field,data) {
    // var event = new Event('infoBoxEvent',{
       var detail ={
            field:field,
            data:data
        }
    // });
    // document.dispatchEvent(event);
    window.glabalback(detail);
}