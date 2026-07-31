import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaMagic, FaStar } from "react-icons/fa";
import "../styles/LyliaRevealScene.css";

export default function LyliaRevealScene({ onContinue }) {


  useEffect(() => {

    const voice = new Audio("/audio/lylia.mp3");

    voice.volume = 1;

    voice.play();


    return () => {

      voice.pause();

      voice.currentTime = 0;

    };


  }, []);



  return (

    <motion.div
      className="lylia-scene"

      initial={{
        opacity:0
      }}

      animate={{
        opacity:1
      }}

      transition={{
        duration:1.5
      }}
    >


      {/* MAGIC PORTAL */}

      <div className="lylia-portal"></div>



      {/* FLOATING PARTICLES */}

      <div className="lylia-particles">

        {Array.from({length:35}).map((_,i)=>(

          <span

            key={i}

            style={{

              left:`${Math.random()*100}%`,

              animationDelay:`${Math.random()*5}s`

            }}

          />

        ))}

      </div>




      {/* LYLLIA CHARACTER */}

      <motion.img

        src="/images/mage.png"

        alt="Lylia"

        className="lylia-image"


        initial={{

          scale:.3,

          opacity:0,

          y:200

        }}


        animate={{

          scale:1,

          opacity:1,

          y:0

        }}


        transition={{

          duration:2,

          ease:"easeOut"

        }}

      />





      {/* TEXT */}

      <motion.div

        className="lylia-text"


        initial={{

          opacity:0,

          y:60

        }}


        animate={{

          opacity:1,

          y:0

        }}


        transition={{

          delay:1.5,

          duration:1

        }}

      >


        <FaMagic className="lylia-icon"/>


        <h1>
          LYLLIA
        </h1>


        <p>
          The Magical Sorceress has arrived...
        </p>


        <p className="celebrate-text">

          💜 Come, let's celebrate this
          wonderful moment together!

        </p>



        <button

          onClick={onContinue}

        >

          CONTINUE THE MAGIC

        </button>



      </motion.div>





      {/* STARS */}

      <FaStar className="star s1"/>

      <FaStar className="star s2"/>

      <FaStar className="star s3"/>



    </motion.div>

  );

}