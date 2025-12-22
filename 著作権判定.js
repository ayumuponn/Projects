const PROTECTION_YEARS = 70; //著作権保護年数70年（2018年12月30日施行、2018年12月30日までは没後50年のため条件分岐の機能追加が必須）

function checkCopyright() { //著作権判定
    const deathYear = document.querySelector(`#deathYearInput`).value;
    const resultArea = document.querySelector(`#resultArea`);

    resultArea.className =``; //入力欄消去（空欄で上書き）

    if(!deathYear || isNaN(deathYear)) {
        resultArea.innerHTML = "無効、没年を正しく入力してください";
        return;
    }
    const currentYear = new Date().getFullYear(); //入力した現在の年
    const expiryYear = parseInt(deathYear) + PROTECTION_YEARS; //失効70年（2018年12月31日以前は50年）
    const publicDomainYear = expiryYear + 1; //※パブリックドメインになるのは著作権消滅翌年の1月1日

    let message ="";
    if (currentYear >= publicDomainYear) {
        message =`パブリックドメイン（著作権消滅済）`;
        message += `<br>著作権は${expiryYear}年末に消滅しました。`;
        //著作権消滅の緑色適用（CSS上書き）
        resultArea.className = `copyright-expired`
        } else { //著作権失効までの年（yearRemaining）
            const yearsRemaining = publicDomainYear - currentYear;
            message = `著作権保護期間内です（著作権有効）`
            message += `<br>残りおおよそ${yearsRemaining}年です。`;
        //著作権有効中の赤色適用（CSS上書き）
        resultArea.className = `copyright-valid`
        }

        //結果をHTMLに入力
        resultArea.innerHTML = message;
}