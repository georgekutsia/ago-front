import React from "react";

function CEOGalleyComponent({ ceoData, companyName }) {
  console.log(ceoData);



  return (
    <div>
      <div class="card">
        <div class="card-body">
            <p>A well-known quote, contained in a blockquote element.</p>
            <footer class="blockquote-footer">
             {ceoData.name} -  C.E.O de {companyName}<cite title="Source Title"></cite>
            </footer>
        </div>
      </div>
    </div>
  );
}

export default CEOGalleyComponent;
