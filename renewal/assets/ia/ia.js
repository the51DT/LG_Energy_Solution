$(()=>{

    let tr = $(".ia_table tbody tr").filter((idx, item)=> $(item).hasClass("x")==false ).filter((idx, item)=> $(item).hasClass("divide")==false );
    tr.each((idx, item)=>{ $(item).find("td").eq(0).text(`${idx+1}`) });

    let total = tr.length;
    let end = tr.filter((idx, item)=> $(item).hasClass("end") ).length;
    let progress = ((end*100)/total).toFixed(2);
    let ia_progress = `
        <div class="ia_progress">
            <div class="total">전체 <b>${end}</b> / ${total} page</div>
            <div class="graph"><span style="width:${progress}%"></span></div>
            <div class="done">${progress}%</div>
        </div>
    `;
    $(".ia_table").prepend(ia_progress);

})