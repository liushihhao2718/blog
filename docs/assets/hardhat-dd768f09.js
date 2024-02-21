import"./styles-0583564f.js";const n=`# 在小小的礦場裡面挖呀挖呀挖

今天我們來介紹eth上的DApp\`Decentralized Application\` (去中心化應用程式)，跟一般App的差別在於使用到區塊鏈上的資料，執行智能合約等，最好的例子可能就是近幾年特別火熱(又涼的特別快)的NFT應用了。

一般我們理解的網路服務App包含本地的client，可能是瀏覽器或手機App，連線到server獲取服務，可能會用Restful風格來設計功能，並將資料儲存在database中

![Untitled](/hardhat/Untitled.png)

ETH dapp的架構則包含了web3 錢包、provider、以及Node來連線到區塊鏈，我們把原本的服務稱為web2。web3與web2最大的差異在於資料是公開在區塊鏈上的，相比於web2大部分的邏輯發生在server中，web3服務需要寫智能合約(如solidity)來進行區塊鏈的資料存取。

![Untitled](/hardhat/Untitled%201.png)

除了ETH主鏈之外有很多不同的測試網路，比如**Sepolia**、**Goerli**，今天我想要介紹的是本地測試鏈

[hardhat](https://hardhat.org/)

# hardhat是什麼？

為什麼要用本地測試鏈，直接用Sepolia不行嗎？

因為智能合約的開發需要大量的測試，一直部署到測試鏈上會花費大量的時間跟gas fee，不如本地測試來得方便。

hardhat是一個集測試、部署、合約互動的環境，但我覺得說明太基本的沒有意思，請先看官網tutorial有一個基本的概念 [https://hardhat.org/tutorial](https://hardhat.org/tutorial)

然後你會發現這個tutorial只有使用hardhat環境部署與測試的功能，對寫網頁dapp沒有幫助，除非你願意去看另一個用React寫的 [repo](https://hardhat.org/tutorial/boilerplate-project)

# ethers.js常用功能

我想要統整一下在這兩個repo裡的概念，因為在hardhat環境裡跟在網頁裡的開發是不一樣的，雖然hardhat裡使用ehters.js與區塊鏈互動，但是hardhat又加入了很多ether.js沒有的功能在他的範例裡，這讓我在一開始想要寫網頁的時候吃了點苦頭

### deploy

hardhat有直接給合約名稱變幫你部署好的功能

\`\`\`javascript
const hardhatToken = await ethers.deployContract("Token");
// or
const Token = await ethers.getContractFactory("Token");
const token = await Token.deploy();
\`\`\`

browser並不認識合約，你必須把abi跟byte提供給他

\`\`\`javascript
const factory = new ContractFactory(contractAbi, contractByteCode);
const contract = await factory.deploy(constructorArgs);
\`\`\`

### get instance

使用\`ContractFactory\` 去attch特定合約地址，來宣告合約物件

\`\`\`javascript
//use hardhat funciton
const Token = await ethers.getContractFactory("Token");
//or provide abi and byte code
const Token = new ContractFactory(TokenAbi, contractByteCode);

const contract = await Token.attach(address)

//contract instance再attach其他地址也是可以的
const contract2 = await contract.attach(address2)
\`\`\`

或是按照[官方文件](https://docs.ethers.org/v6/getting-started/#starting-contracts)的方式，提供ens或address，再加上abi便可以取得合約物件，這在要操作很多相同interface的合約時特別有用，比如你有多個不同合約的ERC20代幣，那麽你可以提供erc20的abi。

\`\`\`javascript
abi = [
  "function decimals() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address addr) view returns (uint)"
]

contract = new Contract("dai.tokens.ethers.eth", abi, provider)
\`\`\`

在網頁內的合約互動，應該大多都是使用此種方式，因為僅僅需要跟合約互動沒有要重新部署合約，不需要提供byte code，甚至也不需要提供完整的abi，只要包含需要的function便可。

但我通常還是會用erc20、erc721等abi來建立，這樣比較方便，當然如果是自己的合約，當然是提供完整的abi

### interact with contrcat

合約互動的呼叫沒有環境差異，按照[官方文件](https://docs.ethers.org/v6/getting-started/#starting-contracts)來即可，但還是有重點可以提醒一下

\`\`\`javascript
abi = [
  "function symbol() view returns (string)",

	"function transfer(address to, uint amount)"

	"event Transfer(address indexed from, address indexed to, uint amount)"
]

contract = new Contract("dai.tokens.ethers.eth", abi, provider)
\`\`\`

**第一種是** read only型的function，可以直接取得結果

\`\`\`javascript
sym = await contract.symbol()
// 'DAI'
\`\`\`

**第二種是**會改變鏈上資料的，會需要發送交易並等待交易完成

\`\`\`javascript
amount = parseUnits("1.0", 18)
tx = await contract.transfer("ethers.eth", amount)

tx.hash;//可以顯示連結讓使用者去etherscan上看看他的交易是否成功

await tx.wait()//等待數秒到數分鐘，看網路忙碌程度
//交易成功，如果不成功會拋出錯誤
\`\`\`

然而我們並沒有辦法知道交易的具體結果，這時候可以依靠監聽event來取得詳細的資訊

\`\`\`javascript
contract.on("Transfer", (from, to, _amount, event) => {
  const amount = formatEther(_amount, 18)
  console.log(\`\${ from } => \${ to }: \${ amount }\`);
});
\`\`\`

或是在發送交易發送之前先用\`staticCall\`試跑結果，要注意這並不會改變鏈上的資料，只是試跑

\`\`\`javascript
await contract.transfer.staticCall("ethers.eth", amount)
//true
\`\`\`

交易前可以用\`estimateGas\`先計算需要的gas呈現在UI上，幫助使用者知道所需的費用

\`\`\`javascript
await contract.transfer.estimateGas.staticCall("ethers.eth", amount)
//bigint {value: 100}
\`\`\`

### 我跑失敗了！要怎麼debug? UNPREDICTABLE_GAS_LIMIT是什麼？為什麼我查不到資料！

大部分的合約互動都會以**UNPREDICTABLE_GAS_LIMIT**的形式出現，即代表錯誤而無法估算交易的gas fee

然而這樣的訊息無從幫助我們尋找智能合約的錯誤所在。在上面的hardhat tutorial中有提到hardhat提供了console.log的功能，在開發的過程中提供了方便的方式讓你了解智能合約的運作過程。

\`\`\`javascript
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
  //...

	function transfer(address to, uint256 amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens");

    console.log(
        "Transferring from %s to %s %s tokens",
        msg.sender,
        to,
        amount
    );

    balances[msg.sender] -= amount;
    balances[to] += amount;

    emit Transfer(msg.sender, to, amount);
	}
}
\`\`\`

但事實上，現實並不是總這麼的美好，什麼問題都可以在開發階段發現，很多時候在已經部署到測鏈或主鏈後才被察覺。這個時候就需要其他的方法來排除錯誤了。

報錯資料中包含了大量的訊息，很多時候只是我們不知道怎麼解讀而已，分析報錯transcation data裡的資訊，會讓你可以快速的掌握智能合約拋出的訊息

\`\`\`javascript
function parseInputData(abi, data, parseType) {
  const pick = (obj, ...keys) =>
    Object.fromEntries(
      keys.filter((key) => key in obj).map((key) => [key, obj[key]])
    );
  const iface = new Interface(abi);
  let parsed;

  switch (parseType) {
    case 'transcation':
      parsed = iface.parseTransaction({ data });
      break;
    case 'log':
    parsed = iface.parseLog(data);
      break;
    case 'error':
    parsed = iface.parseError(data);
      break;
  }

  const table = parsed.fragment.inputs.map((x, i) =>
    Object.assign(pick(x, "name", "type"), { value: parsed.args[i].toString() })
  );

  return { table, transDesc: parsed };
}
\`\`\`

另一個方式是使用[hardhat fork](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#mainnet-forking)，在你確認智能合約由你部署，且在本地端沒有修改過的情況下，可以使用fork的方式，hardhat會詳細的報出錯誤的行數，如同在本地端hardhat測鏈抓取錯誤一樣，這是最直觀的debug方式

我寫了一個debug用的[合約工具](https://hilarious-frangollo-480014.netlify.app/)，目的是測試測鏈上的合約執行狀況，因為大部分的時間下，你可能不會擁有合約的source code，以及他的詳細編譯狀況來進行debug，在ehterscan上也不會有這份合約的互動介面，這個時候只能自行提供ABI，或是使用常用的erc20、erc721來進行測試，在大多情況下還是對測試合約挺有幫助的。

![截圖 2024-02-19 22.13.12.png](/hardhat/%25E6%2588%25AA%25E5%259C%2596_2024-02-19_22.13.12.png)`;document.getElementById("content").innerHTML=marked.parse(n);hljs.highlightAll();
