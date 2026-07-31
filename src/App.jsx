import "./App.css";
import { useRef, useState } from "react";

import MagicIntroScene from "./components/MagicIntroScene";
import LyliaRevealScene from "./components/LyliaRevealScene";
import InvitationScene from "./components/InvitationScene";


export default function App() {

  const videoRef = useRef(null);

  const [scene, setScene] = useState("magic");

  const [showGreeting, setShowGreeting] = useState(false);

  const [playedGreeting, setPlayedGreeting] = useState(false);



  const startInvitation = () => {
    setScene("invitation");
  };



  const startLylia = () => {
    setScene("lylia");
  };



  const startNeoBeast = () => {

    setScene("neobeast");


    setTimeout(() => {

      if(videoRef.current){

        videoRef.current.play();

      }

    },200);

  };




  return (

    <div className="app">



      {/* MAGIC INTRO */}

      {scene === "magic" && (

        <MagicIntroScene

          onBegin={startLylia}

        />

      )}





      {/* LYLIA REVEAL */}

      {scene === "lylia" && (

        <LyliaRevealScene

          onContinue={startNeoBeast}

        />

      )}





      {/* NEOBEAST */}

      {scene === "neobeast" && (

        <>


          <video

            ref={videoRef}

            className="intro-video"

            autoPlay

            playsInline


            onTimeUpdate={(e)=>{


              const video = e.target;



              if(

                video.duration &&

                video.currentTime >= video.duration - 5 &&

                !playedGreeting

              ){


                setPlayedGreeting(true);



                const greeting = new Audio(
                  "/audio/greetings.mp3"
                );


                greeting.volume = 1;



                greeting.play();



                setTimeout(()=>{

                  setShowGreeting(true);

                },1000);



                greeting.onended = () => {

                  setShowGreeting(false);

                  startInvitation();

                };


              }


            }}


          >

            <source

              src="/video/neobeast.mp4"

              type="video/mp4"

            />

          </video>





          {showGreeting && (

            <div className="birthday-overlay">


              <img

                src="/images/mage.png"

                alt="Lylia"

                className="birthday-lylia"

              />



              <div className="birthday-text">


                <h3>

                  ✨ A Special Magic Has Appeared ✨

                </h3>



                <h1>

                  HAPPY BIRTHMONTH

                </h1>



                <h2>

                  DALRYMPLE!

                </h2>




                <p>

                  May your days be filled with happiness,
                  laughter, and endless adventures.

                </p>




                <p>

                  Just like magic, may every dream you wish
                  for slowly become reality.

                </p>



              </div>


            </div>

          )}


        </>

      )}






      {/* INVITATION SCENE */}

      {scene === "invitation" && (

        <InvitationScene />

      )}




    </div>

  );

}