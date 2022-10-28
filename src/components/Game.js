import React, { useState, useEffect } from "react";

export default function Game() {
  const [value, setValue] = useState([]);
  const [visible, setVisible] = useState(false);
  const [cardindex, setCardindex] = useState([]);
  const [mainarr, setMainarr] = useState([]);
  const [randomarr, setRandomarr] = useState([]);
  const [isdis,setIsdis] = useState(false);

  function Randomgenrate() {
    let num;
    const random = [];
    for (let i = 0; i < 20; i++) {
      num = Math.floor(Math.random() * 10);
      if (random.length === 4) {
        break;
      } else {
        if (!random.includes(num)) {
          random.push(num);
        }
      }
    }
    setRandomarr(random);
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const initial = async () => {
    Randomgenrate();
    let first = [...randomarr];
    const second = shuffleArray(randomarr);
    const arrayofnum = first.concat(second);
    setMainarr(arrayofnum);
  };

  const start = (e) => {
    e.preventDefault();
    setVisible(true);
    setIsdis(true)
  };

  const shownumber = (e, val, index) => {
    e.preventDefault();
    let array_val = [...cardindex];
    array_val.push(index);
    setCardindex(array_val);

    if (value.length > 0) {
      let a = value[0] - val;
      if (a !== 0) {
        alert("You Lost the Game, better luck next time ☹👎");
        let prev = [];
        setValue(prev);
        restart()
      } else if (a === 0) {
        let prev = [];
        setValue(prev);
      } else {

        let prev = [];
        prev.push(val);
        setValue(prev);
      }
    } else {
      let prev = [];
      prev.push(val);
      setValue(prev);
    }
    cardindex.length > 6 && alert("Congratulations !!! You Won the game 🤩");
  };

  const restart = () => {
    initial();
    setValue([]);
    setVisible(false);
    setCardindex([]);
    setMainarr([]);
    setRandomarr([]);
    setIsdis(false)
    
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-8 pb-20">
          <div className="mt-2 flex justify-center">
            <button
              className="bg-red-500 rounded px-4 py-2 w-4/12 text-lg text-uppercase font-serif font-bold hover:bg-red-300 shadow-lg shadow-stone-900"
              onClick={initial}
            >
              Game Start
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              className="bg-red-500 rounded px-4 py-2 w-4/12 text-lg text-uppercase font-serif font-bold hover:bg-red-300 shadow-lg shadow-stone-900"
              onClick={start}
              disabled={isdis}
            >
              Show Cards
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              className="bg-red-500 rounded px-4 py-2 w-4/12 text-lg text-uppercase font-serif font-bold hover:bg-red-300 shadow-lg shadow-stone-900"
              onClick={restart}
            >
              Restart
            </button>
          </div>
          <div className=" grid md:grid-cols-4 gap-5 mt-10 mx-5">
            {mainarr.map((val, i) => {
              return (
                <button
                  disabled={cardindex.includes(i) ? true : false}
                  key={i}
                  className="border-2 h-40 w-full flex   justify-center rounded-md bg-cyan-500 shadow-2xl shadow-stone-900 hover:bg-cyan-100"
                  onClick={(e) => shownumber(e, val, i)}
                >
                  {visible || cardindex.includes(i) ? (
                    <div className="text-9xl">{val}</div>
                  ) : (
                    ""
                  )}
                </button>
              );
            })}
          </div>
        </div>
    </>
  );
}
