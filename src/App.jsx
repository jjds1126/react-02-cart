import {useState} from "react";

function App() {
    const [name, setName] = useState(""); // input 관리용
    const [cart, setCart] = useState([]);  // 목록 관리용

    return (
      <>
        <h2>Simple Shop</h2>
          <fieldset>
              <legend>상품 추가</legend>
              <form onSubmit={(event) => {
                  event.preventDefault();
                  if (name === "" || name === " ") {
                      return;
                  }
                  setCart([...cart, { name: name, quantity: 1 }]);
                  setName("");
              }}>
                  <input
                      placeholder={"상품명을 입력하세요"}
                      value={name}
                      onChange={(e) =>{ setName(e.target.value);}} />
                  <button type={"submit"}>카트에 담기</button>
              </form>
          </fieldset>
        <table border={1}
               cellPadding={10}
               style={{

            width: "100%",
            borderCollapse:"collapse",
        }}>
          <thead style={{ backgroundColor: "#f2f2f2"}}>
          <tr>
              <th>상품명</th>
              <th>수량 제어</th>
              <th>관리</th>
          </tr>
          </thead>
          <tbody>
          {cart.map((item, index) => <tr key={index}>
              <td>{item.name}</td>
              <td>
                  <button onClick={() => {
                      // 지금 현재 수량이 1 이하면, 실행하지 않게끔
                      if (item.quantity <= 1) {
                          return
                      }
                      const newCart = [...cart];
                      newCart[index].quantity += 1;
                      setCart(newCart);
                  }}>-</button>
                  {item.quantity}
                  <button onClick={() => {

                      const newCart = [...cart];
                      newCart[index].quantity += 1;
                      setCart(newCart);
                  }}>+</button>
              </td>
              <td>
                  <button onClick={() => {
                      const result = cart.filter((v, i) => {
                          return i !== index
                      });
                      setCart(result);
                  }}>삭제</button>
              </td>
          </tr>)}
          </tbody>
          </table>
          <h3>총 품목 : {cart.length}개 / 총 수량: {cart.reduce((sum, item) => { return item.quantity + sum }, 0)}개</h3>
    </>
    );
}
// 가능을 합쳐서 핸들러를 만드는데,
// '1을 더하고', '1을 빼고' 하는 기능이 아니라, "수량을 변경하는 함수" 로 만듫
// 얼마나 바꾸느는 이 함수를 실행하는 곳에서 결정(매개변수로 전달)

export default App;