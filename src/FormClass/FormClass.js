import React, { Component } from "react";

export class FormClass extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      fillArr: [],
      isEdited: 0,
      indexVal: null,
      fill: "All",
    };
    this.eName = React.createRef();
    this.eDes = React.createRef();
    this.eCheck = React.createRef();
    this.ePrgrs = React.createRef();
  }

  handleSubmit = (e) => {
    if (this.state.isEdited == 1) {
      e.preventDefault();
      let newObj = {
        name: e.target.name.value,
        des: e.target.des.value,
        prior: e.target.check.checked,
        prgs: e.target.select.value,
      };
      let newArr = [...this.state.arr];
      newArr[this.state.indexVal] = newObj;
      this.setState({ arr: newArr });
      this.setState({ isEdited: 0 });

      e.target.name.value = "";
      e.target.des.value = "";
     
      e.target.select.value = "To Do";
    } else {
      e.preventDefault();
      let obj = {
        name: e.target.name.value,
        des: e.target.des.value,
        prior: e.target.check.checked,
        prgs: e.target.select.value,
      };

      this.setState({ arr: [...this.state.arr, obj] });
      // this.setState({ fillArr: [...this.state.arr] ,obj});
      console.log(obj);
      e.target.name.value = "";
      e.target.des.value = "";
      e.target.check.checked = false;
      e.target.select.value = "ToDo";
    }
  };

  deleteData = (index) => {
    let temp = [...this.state.arr];
    let dt = temp.filter((t, i) => i != index);
    console.log(dt);
    this.setState({ arr: dt });
    //console.log(this.setState.isEdited);
  };

  editData = (name, des, prior, prgs, index) => {
    console.log(prior, prgs);
    this.eName.current.value = name;
    this.eDes.current.value = des;
    this.eCheck.current.checked = prior;
    this.ePrgrs.current.value = prgs;
    this.eDes.current.focus();
    this.eName.current.focus();
    //let temp = [...this.state.arr];

    this.setState({ isEdited: 1 });
    this.setState({ indexVal: index });
  };

  onFilter = (event) => {
    const val = event.target.value;
    this.setState({ fill: val });
    // let filterArr = [...this.state.arr];
    // let ft = filterArr.filter((t) => t.prgs == val);
    // console.log(ft);
    // this.setState({ arr: ft });
  };
  render() {
    return (
      <div>
        FormClass
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Task Name"
              name="name"
              ref={this.eName}
            ></input>
          </div>
          <div>
            <textarea
              name="des"
              placeholder="Enter Task Description"
              ref={this.eDes}
            />
          </div>
          <div>
            <input type="checkbox" name="check" ref={this.eCheck}></input>
            <label> Prioritize </label>
          </div>
          <div>
            <label>Progress</label>
            <select name="select" ref={this.ePrgrs}>
              <option value="ToDo">To Do</option>

              <option value="OnGoing">On Going</option>

              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
        <h1>Data</h1>
        <h1>Filter</h1>
        <select onChange={this.onFilter} className="form-select">
          <option value="All">All</option>
          <option value="ToDo">To Do</option>
          <option value="OnGoing">On Going</option>
          <option value="Completed">Completed</option>
        </select>
        {/* <select name="filterPrgrs" onChange={()=>this.filterData()}>
        <option value="All">All</option>
          <option value="To Do">To Do</option>

          <option value="On Going">On Going</option>

          <option value="Completed">Completed</option>
        </select> */}
        <div>
          {this.state.arr.map((e, i) => {
            if (this.state.fill == "All") {
              return (
                <div key={i}>
                  <h1>Task Name:{e.name}</h1>
                  <h1>Description:{e.des}</h1>
                  <h1>Priority:{e.prior ? "Yes" : "No"}</h1>
                  <h1>Progress:{e.prgs}</h1>
                  <button onClick={() => this.deleteData(i)}> Delete</button>
                  <button
                    onClick={() =>
                      this.editData(e.name, e.des, e.prior, e.prgs, i)
                    }
                  >
                    Edit
                  </button>
                </div>
              );
            } else {
              if (this.state.fill == e.prgs) {
                return (
                  <div key={i}>
                    <h1>Task Name:{e.name}</h1>
                    <h1>Description:{e.des}</h1>
                    <h1>Priority:{e.prior ? "Yes" : "No"}</h1>
                    <h1>Progress:{e.prgs}</h1>
                    <button onClick={() => this.deleteData(i)}> Delete</button>
                    <button
                      onClick={() =>
                        this.editData(e.name, e.des, e.prior, e.prgs, i)
                      }
                    >
                      Edit
                    </button>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    );
  }
}

export default FormClass;

{
  /* <div key={i}>
              <h1>Task Name:{e.name}</h1>
              <h1>Description:{e.des}</h1>
              <h1>Priority:{e.prior ? "Yes" : "No"}</h1>
              <h1>Progress:{e.prgs}</h1>
              <button onClick={() => this.deleteData(i)}> Delete</button>
              <button
                onClick={() => this.editData(e.name, e.des, e.prior, e.prgs, i)}
              >
                {" "}
                Edit
              </button>
            </div> */
}
