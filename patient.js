function Patient() {
    console.log("Hasta bilgileri oluşturuldu.")
}
Patient.prototype.ekle = function (info) {
    localStorage[info.idNo] = JSON.stringify(info);
    alert("Hasta sisteme başarıyla kayıt edilmiştir.")
}
Patient.prototype.sil = function (ptId) {
    try {
        var ptInfo = JSON.parse(localStorage[ptId]);
        var confirmResult = confirm(`İsmi ${ptInfo.fullName}, kimlik numarası ${ptInfo.idNo} olan hastayı silmek istediğinizden emin misiniz?`)
        if (confirmResult == true) {
            alert(`${ptInfo.fullName} isimli hasta silinmiştir.`)
            delete localStorage[ptId];
        } else {
            alert(`${ptInfo.fullName} isimli hastanın silinmesinden vazgeçilmiştir.`)
        }
    } catch (error) {
        console.log(error);
        alert("Hasta silme işlemi sırasında hata oluştu!")
    }
}
Patient.prototype.ara = function (aramaTipi, aramaKelimesi) {
    try {
        if (aramaTipi == "idNo") {
            for (key in localStorage) {
                if (aramaKelimesi === key) {
                    console.log(JSON.parse(localStorage[aramaKelimesi]));
                    return JSON.parse(localStorage[aramaKelimesi]);
                }
            }
            return {};
        } else {
            var result = [];
            for (key in localStorage) {
                if (typeof localStorage[key] === "string" && localStorage[key].indexOf("{") >= 0) {
                    if (JSON.parse(localStorage[key])[aramaTipi] && JSON.parse(localStorage[key])[aramaTipi].indexOf(aramaKelimesi) >= 0) {
                        result.push(JSON.parse(localStorage[key]));
                    }
                }
            }
            console.log(result);
            return result;
        }
    } catch (error) {
        console.log(error);
        alert("Hasta arama işlemi sırasında hata oluştu!")
    }
}
Patient.prototype.guncelle = function (ptId, key, val) {
    try {
    var pt = this.ara("idNo", ptId);
    pt[key] = val;
    this.ekle(pt);
    alert("Hasta bilgileri güncellenmiştir.");
    } catch (error) {
        console.log(error);
        alert("Hasta güncelleme işlemi sırasında hata oluştu!")
    }
}
Patient.prototype.listele = function () {
    var outcome = [];
    var confirmResult = confirm("Listeleme özelliği yalnızca doktorlar tarafından kullanılabilmektedir. Görüntüleyecek yetkiye sahip misiniz?")
    if (confirmResult == true) {
    for (key in localStorage) {
        if (typeof localStorage[key] === "string" && localStorage[key].indexOf("{") >= 0) {
            outcome.push(JSON.parse(localStorage[key]));
            for (element of outcome){
                var ptInfos = 
                 `
            <table>
             <tr>
              <td> ${element["idNo"]} </td>     
              <td> ${element["fullName"]} </td>
              <td> ${element["gender"]} </td>
              <td> ${element["department"]} </td>
              <td>${element["age"]} </td>
              <td> +90${element["phone"]} </td>
              <td> ${element["email"]} </td>
            `
           document.querySelector("body").insertAdjacentHTML("afterend", ptInfos)
            }
        }
    }
    var tableTitles = document.createElement("text");
    tableTitles.innerHTML = `
    <table>
       <tr>
        <th>Hastanın Kimlik Numarası</th>
        <th>Hastanın Adı-Soyadı</th>
        <th>Hastanın Cinsiyeti</th>
        <th>Seçilen Bölüm Bilgisi</th>
        <th>Hastanın Yaşı</th>
        <th>Hastanın Telefon Numarası</th>
        <th>Hastanın Mail Adresi</th>
      </tr>`
      document.querySelector("body").insertAdjacentElement("beforeend", tableTitles)
console.log(outcome);
    } else {
        alert("Hasta listelemek için yetkiniz bulunmamaktadır!")
    }
}