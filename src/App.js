import './App.css';
import React, { useState, useEffect } from 'react';
import reactImage from './image/react-lifecycle.PNG';

// [ Hook 규칙 ]
// 반복문, 조건문 혹은 중첩된 함수 내에서 Hook을 호출하지 마세요
// 대신 항상 React 함수의 최상위(at the top level)에서 Hook을 호출해야 합니다.
// 이 규칙을 따르면 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 Hook이 호출되는 것이 보장됩니다.
// 이러한 점은 React가 useState 와 useEffect 가 여러 번 호출되는 중에도 Hook의 상태를 올바르게 유지할 수 있도록 해줍니다.

// Hook을 일반적인 JavaScript 함수에서 호출하지 마세요.
// 대신 아래와 같이 호출할 수 있습니다.
// - 'React 함수' 컴포넌트에서 Hook을 호출하세요.
// - 'Custom Hook' 에서 Hook을 호출하세요
// 이 규칙을 지키면 컴포넌트의 모든 상태 관련 로직을 소스코드에서 명확하게 보이도록 할 수 있습니다.

function App() {
  const [func, setFunc] = useState(true);
  const [cla, setCla] = useState(true);
  
  return (
    <div className="App">
      <h2>Hello World</h2>
      <button type="button" onClick={(e) => {
        setFunc(false);
      }}>func_close</button>
      <button type="button" onClick={(e) => {
        setCla(false);
      }}>cla_close</button>
      {func ? <FuncComp initNumber={2}></FuncComp> : null}
      {cla ? <ClassComp initNumber={2}></ClassComp> : null}
      <div className='image-box'>
        <img src={ reactImage } alt='React이미지'></img>
      </div>
    </div>
  );
}

let funcStyle = 'color: orange';
let funcId = 0;
function FuncComp(props) { // - 첫 번째는 항상 props가 온다.(매개변수 이름은 아무거나 상관 없음)
  //const [value, onChange] = useState();
  let numberState = useState(props.initNumber); // - function 에서의 state는 useState()를 사용하고, 배열을 반환 한다. / 인자값(매개변수)으로 초기값을 선언한다.
  let number = numberState[0];     // - 첫 번째 배열은 [값]을 반환 : state 의 상태
  let setNumber = numberState[1];  // - 두 번째 배열은 [함수]를 반환 : state 의 상태를 바꾸는 함수
  
  const [date, setDate] = useState(new Date().toString());
  console.log('%c func => render ' + (++funcId), funcStyle);

  // useEffect 란 : render 이후에 실행되며, useEffect는 render 이후에 ajax를 통해 api를 호출 한다거나, render의 후 작업을 하는 곳이다.
  // ----------------------------------------------------------
  // class 에서의 componentDidMount & componentDidUpdate 와 같다. 
  // ----------------------------------------------------------
  useEffect(function () { // - 첫 번째 인자(매개변수)는 함수가 온다.
    console.log('%c func => useEffect (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);

    // < return 특징 >
    // useEffect 의 return 값은 이전에 useEffect 에서 실행된 작업을 이 return의 함수로 cleanup 되는 역할을 하고 있다.
    // 즉 useEffect 가 실행 되면, 실행되지 전에 이전에 실행된 작업을 내부적으로 cleanup 작업 후에 useEffect 가 실행된다.
    return function () {
      console.log('%c func => useEffect return (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);
    }
  });

  // ---------------------------------------
  // class 에서의 componentDidMount 와 같다.
  // return 은 componentWillUnmount 와 같다.
  // ---------------------------------------
  useEffect(function () {
    console.log('%c func => useEffect (componentDidMount) ' + (++funcId), funcStyle);

    // < return 특징 - componentWillUnmount >
    // useEffect() 가 componentDidMount 기능만을 수행하면 return 은 componentWillUnmount 의 기능과 같다.
    // return 의 componentWillUnmount()는 <FuncComp> 가 지워질 때 동작한다. ★★★
    // <FuncComp>가 지워질 때 나머지 useEffect 의 모든 return 도 실행된다.
    return function () {
      console.log('%c func => useEffect return (componentWillUnmount)' + (++funcId), funcStyle);
    }
  }, []); // - 두 번째 인자(매개변수)는 배열이 온다. / 이 배열은 state의 이전 값이 오고, state의 이전과 이후의 변경상태를 감지한다.
  // 빈 배열은 useEffect() 가 componentDidMount만 수행하도록 한다.

  // ------------------------------------------------------------
  // class 에서의 componentDidMount & componentDidUpdate 와 같다.
  // but, componentDidUpdate는 해당 배열안의 state의 상태가 변경 되어야 해당 useEffect 가 실행된다.
  // ------------------------------------------------------------
  useEffect(function () {
    console.log('%c func => useEffect number (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);

    return function () {
      console.log('%c func => useEffect number return ' + (++funcId), funcStyle);
    }
  }, [number]); // state의 number가 바뀌면 해당 useEffect가 수행된다.

  useEffect(function () {
    console.log('%c func => useEffect date (componentDidMount & componentDidUpdate) ' + (++funcId), funcStyle);

    return function () {
      console.log('%c func => useEffect date return ' + (++funcId), funcStyle);
    }
  }, [date]); // state의 number가 바뀌면 해당 useEffect가 수행된다.

  return (
    <div className="container">
      <h2>function style component</h2>
      <p >Number : { number }</p>
      <p>Date : { date }</p>
      <input type="button" value="random" onClick={(e) => {
        setNumber(Math.random());
      }}>
      </input>
      <input type="button" value="date" onClick={(e) => {
        setDate(new Date().toString());
      }}>
      </input>
    </div>
  );
}

// useState()
// useEffect()
// useEffect return

let classStyle = 'color: red';
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  }

  // ReactDOM.render() 이후 동작
  componentWillMount() {
    console.log('%c class => componentWillMount', classStyle);
  }
  componentDidMount() { // function & class 둘 다 render() 다음에 실행
    console.log('%c class => componentDidMount', classStyle); // function 에서는 useEffect() 와 같다.
  }

  // setState() 이후 동작
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%c class => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('%c class => componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState) { // function & class 둘 다 render() 다음에 실행
    console.log('%c class => componentDidUpdate', classStyle); // function 에서는 useEffect() 와 같다.
  }

  // <ClassComp>가 지워질 때 동작 ★★★
  componentWillUnmount(nextProps, nextState) {
    console.log('%c class => componentWillUnmount', classStyle); // function 에서는 useEffect(function, [])의 return 과 같다.
  }
  // ClassComp 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 componentWillUnmount() 생명주기 메서드를 호출합니다.

  render() {
    console.log('%c class => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={(e) => {
          this.setState({ number: Math.random() });
        }}>
        </input>
        <input type="button" value="date" onClick={(e) => {
          this.setState({ date: new Date().toString() });
        }}>
        </input>
      </div>
    );
  };
}

export default App;
