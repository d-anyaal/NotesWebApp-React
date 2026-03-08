import React from "react";
import notes from "./assets/notes.jpg";
import notePage from "./assets/notepage.jpg";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";
const App = () => {
  const [OldTask, setOldTask] = useState([]);
  const [Error, setError] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (Title === "" || Detail === "") {
      setError(
        <span className="flex items-center gap-2 font-medium ">
          <AlertCircle size={18} />
          Please provide both a task title and details.
        </span>,
      );
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    setError("");
    const copyTask = [...OldTask];
    copyTask.push({ Title, Detail }); //object ki form me data pusj kryn gy
    setOldTask(copyTask); //copytask me jo jo valueati jay gi wo wo Task me store hoti jayn gi. taky new task add hony pr pichly task b old task me store rhyn
    //copytask me old Task ki copy store krny or phir copy task ko odd task me push krny ka purpose hi ye hai ky hr task old task me store hota rhy agr just ek task array pr hi rely krty to new task add kr pr bs wo new task hi yad rkhta pichla task bhol jata, is liye new task jo ay osy old task me store krwa dy phir new task ko accept kry osy phir old me store krwa dy istrha process chlta rhy..
    //all task old Task me store milyn gy
    // console.log(OldTask);

    setTitle("");
    setDetail("");
  };

  const [Title, setTitle] = useState("");
  const [Detail, setDetail] = useState("");
  const [Success, setSuccess] = useState("");

  const DeleteNote = (idx) => {
    const copyTask = [...OldTask];
    // console.log(copyTask[idx]);//copyTask ky flan index pr jo card hai wo hmyn do
    copyTask.splice(idx, 1); //ye delete kry ga mean jis btn pr click hoka oska index idx ky through isy mily ga ye os index sy 1 number tak mean wo index wala card delete kr dy ga
    setOldTask(copyTask); //copyTask me sy delete krny ky bad wo new updated copyTask oldtask me set krdo, qky set hogi to remove hony ky bad webpage pr show hogi
    setSuccess(
      <span className="flex items-center gap-2 font-medium">
        <CheckCircle size={18} />
        Note deleted successfully
      </span>,
    );
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  return (
    <>
      <div className="relative min-h-screen ">
        <img
          src={notes}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 lg:flex lg:items-start text-white p-10">
          <form className="flex lg:w-1/2 justify-between items-start flex-col gap-8 p-8">
            {/* ERROR MESSAGE */}
            {Error && <div className="error-container">{Error}</div>}
            {/* Success MESSAGE */}
            {Success && <div className="success-container">{Success}</div>}

            <h1 className="text-3xl font-bold">Add Notes</h1>
            <input
              onChange={(val) => {
                setTitle(val.target.value);
              }}
              value={Title} //yeha Title ek variable hai jisy ham State ky through handle kr rhy hyn.
              type="text"
              placeholder="Enter Notes Heading"
              className="px-5 outline-none w-full py-2 font-semibold border-2 rounded"
            />

            <textarea
              onChange={(e) => {
                setDetail(e.target.value);
              }}
              value={Detail}
              type="text"
              placeholder="Write Details"
              className="px-5 pt-2 pb-6 h-32 resize-none font-semibold overflow-hidden outline-none w-full py-2 border-2 rounded"
            />
            <button
              onClick={(e) => {
                submitHandler(e);
              }}
              className="bg-white w-full  transform transition-transform duration-200 ease-out 
                hover:scale-102 hover:shadow-lg 
                active:scale-80 active:font-bold active:shadow-sm font-semibold  text-black px-5 py-2 rounded "
            >
              Add Notes
            </button>
          </form>
          <div className="scrllbar lg:border-l-2 lg:w-1/2 max-h-[90vh]  overflow-y-auto p-8">
            <h1 className="text-3xl font-bold">Recent Notes</h1>
            <div className="flex flex-wrap items-start justify-start  gap-5 mt-5 overflow-auto">
              {OldTask.map(function (elem, idx) {
                // console.log(elem);
                return (
                  <div
                    key={idx}
                    style={{ backgroundImage: `url(${notePage})` }}
                    className="relative h-52  w-40 rounded-2xl px-7 py-4 bg-cover p-4 text-black"
                  >
                    {/* Scrollable content */}
                    <div className="overflow-y-auto scrllbar overflow-x-hidden h-full pr-2 pb-12">
                      <h1 className="font-sans font-semibold text-base leading-tight text-black break-words">
                        {elem.Title}
                      </h1>
                      <p className="mt-1.5 text-sm font-medium leading-tight text-gray-700 break-words">
                        {elem.Detail}
                      </p>
                    </div>

                    {/* Fixed button at bottom */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-auto]">
                      <button
                        onClick={() => {
                          DeleteNote(idx);
                        }}
                        className="
                                flex items-center px-2 py-2
                                bg-red-600 text-white font-semibold text-lg rounded-lg
                                shadow-md hover:bg-red-700 hover:shadow-lg 
                                transition-colors transition-shadow duration-200 ease-out
                                active:scale-90"
                      >
                        <Trash2 size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
