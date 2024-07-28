import"./styles-0583564f.js";const n=`# 做 NFT 時遇到的問題

做 NFT、區塊鏈這些新東西的時候會遇到的問題，就是它是新東西。具體的說，當你遇到困難的時候，是找不到解答的，你想跟身邊的人討論，他甚至連你研究的東西是什麼都不知道，更別說探討解決的方案了。

曾經在區塊鏈上執行智能合約報錯的問題困擾了我很久，因為排開網路問題、沒錢的問題，真正跟智能合約執行有關的 Error code 只有一種，就是 UNPREDICTABLE_GAS_LIMIT，這件事對當時的我來說是毫無頭緒的，他的意思就是智能合約執行不下去所以無法估算需要的花費，廢話我當然知道執行不下去啊，就是因為知道錯在哪才要看 error code 啊。這問題你去查 stackoverflow 或是 github issue 一定是找得到的，一定有人問過，畢竟做區塊鏈的人那麼多，咱肯定不是做些研究的第一人。那有沒有解答呢？肯定是沒有的。只有一些不是很確定的猜測，或是建議你可以怎麼去拿裡查看看。我自己也是花了很長的一段時間才找到了解方。並不是說這個無法執行的問題我找不到答案就不管了，因為在當下我們還是有別的替代方案去解決這個執行的問題。比如說我們可以把同樣的輸入跟合約拉回測試環境來查看錯誤、用hardhat console.log的話，甚至可以打印執行的過程、沒有辦法複製的話，也可以用fork的方式讓鏈上狀態複製到本地執行。總之我們總能想到法子不去解決Error code的問題，而是想到某種方式繞過它，去解決後面的問題。

直到有一天我在跟同事一起看他的問題的時候，我脫口而出：「你怎麼就不試著去解析它呢？」霎那間我自己恍然大悟，肯定是有函數可以解析報錯時的一長串binary data的，只是我自己一直不願去看懂它。我花了不多的時間就在文件裡找到解析的辦法，把我們自己的程式改成可以精準印出目前執行的問題，再也不需要更換環境、去重新編譯了。我還把它寫成一個網頁小工具，這樣任何人想要快速查看的時候都可以透過它，但你只是把連結分享給大家的話，沒有人會真的去用它，所以我把推廣小工具當成我的一個志業，只要有人在智能合約執行遇到問題，我就會推薦他使用我的工具，要是真的有用我會高興好一陣子。

說遠了，我想說的是一個認知提高的問題，當我意識到自己可以解決那個長期沒有答案的問題，我的視野一下變得開闊了些，我唯一缺乏的就是那個去讀懂我不了解的、去回答尚未被解答的，不要捨近求遠，繞過應該被解決的問題的認知。

回過頭來看，我開發NFT系統的途中一直在等待一個問題的答案，Web3究竟是什麼？NFT的價值在哪裡？我的工作不外乎就是讓系統變得好用，增加功能去迎合被談來的，也不大了解NFT是什麼的新客戶。然後我終於在活動結束後的會議上，聽到上級的疑問，才知道我們的所有忙碌都源自於Web3是什麼從來沒有被好好定義過。

繞了這樣長的一段路才明白，比起什麼系統設計，什麼區塊鏈error code，這才是真正應該被回答的問題，真是太傻了呀。`;document.getElementById("content").innerHTML=marked.parse(n);hljs.highlightAll();