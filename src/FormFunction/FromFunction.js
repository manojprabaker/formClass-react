import React from "react";
import { useState } from "react";

const FromFunction = () => {
  const [formData, setformData] = useState([]);
  const [isEdit, setisEdit] = useState(0);
  const [index, setIndex] = useState(null);
  const [fill, setfill] = useState("All");
  const handleSubmit = (e) => {
    if (isEdit == 1) {
      e.preventDefault();
      let obj = {
        name: e.target.name.value,
        des: e.target.des.value,
        prior: e.target.check.checked,
        prgs: e.target.select.value,
      };
      let newData = formData;
      newData[index] = obj;
      setformData(newData);
      let temp = 0;
      setisEdit(temp);
      e.target.name.value = "";
      e.target.des.value = "";
      e.target.check.checked = false;
      e.target.select.value = "ToDo";
    } else {
      e.preventDefault();
      let obj = {
        name: e.target.name.value,
        des: e.target.des.value,
        prior: e.target.check.checked,
        prgs: e.target.select.value,
      };
      setformData([...formData, obj]);
      e.target.name.value = "";
      e.target.des.value = "";
      e.target.check.checked = false;
      e.target.select.value = "ToDo";
    }
  };
  const deleteData = (index) => {
    let temp = formData;
    temp = temp.filter((e, i) => i != index);
    setformData(temp);
  };
  const editData = (e, name, des, prior, prgs, index) => {
    document.getElementById("names").value = name;
    document.getElementById("dess").value = des;
    document.getElementById("checks").checked = prior;
    document.getElementById("selects").value = prgs;
    let temp = 1;
    setisEdit(temp);
    setIndex(index);
  };
  const onFilter=(e)=>{
let selVal=e.target.value;
setfill(selVal);
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Task Name"
            name="name"
            id="names"
          ></input>
        </div>
        <div>
          <textarea name="des" placeholder="Enter Task Description" id="dess" />
        </div>
        <div>
          <input type="checkbox" name="check" id="checks"></input>
          <label> Prioritize </label>
        </div>
        <div>
          <label>Progress</label>
          <select name="select" id="selects">
            <option value="ToDo">To Do</option>

            <option value="OnGoing">On Going</option>

            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
      <select onChange={onFilter} className="form-select">
        <option value="All">All</option>
        <option value="ToDo">To Do</option>
        <option value="OnGoing">On Going</option>
        <option value="Completed">Completed</option>
      </select>
      <div>
        {formData.map((e, i) => {
            if(fill=="All")
            {return (
                <div key={i}>
                  <h1>Task Name:{e.name}</h1>
                  <h1>Description:{e.des}</h1>
                  <h1>Priority:{e.prior ? "Yes" : "No"}</h1>
                  <h1>Progress:{e.prgs}</h1>
                  <button onClick={() => deleteData(i)}> Delete</button>
                  <button
                    onClick={() => editData(e, e.name, e.des, e.prior, e.prgs, i)}
                  >
                    Edit
                  </button>
                </div>
              );}
              else{
                if(fill==e.prgs)
                {
          return (
            <div key={i}>
              <h1>Task Name:{e.name}</h1>
              <h1>Description:{e.des}</h1>
              <h1>Priority:{e.prior ? "Yes" : "No"}</h1>
              <h1>Progress:{e.prgs}</h1>
              <button onClick={() => deleteData(i)}> Delete</button>
              <button
                onClick={() => editData(e, e.name, e.des, e.prior, e.prgs, i)}
              >
                Edit
              </button>
            </div>
          );}}
        })}
      </div>
    </div>
  );
};

export default FromFunction
