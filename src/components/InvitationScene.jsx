import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/InvitationScene.css";

export default function InvitationScene() {

  const [opened, setOpened] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [declineCount, setDeclineCount] = useState(0);

  const [declinePosition, setDeclinePosition] = useState({
    x:0,
    y:0
  });



  const openMagic = () => {

    setOpened(true);

  };



  const acceptInvitation = () => {

    setAccepted(true);


    const voice = new Audio(
      "/audio/see-yah.mp3"
    );

    voice.volume = 1;

    voice.play();

  };




  const declineInvitation = () => {


    const sounds = [

      "/audio/decline1.mp3",

      "/audio/decline2.mp3",

      "/audio/decline3.mp3"

    ];



    const sound = new Audio(
      sounds[declineCount % 3]
    );


    sound.play();



    setDeclineCount(
      declineCount + 1
    );



    setDeclinePosition({

      x:
      Math.random() * 300 - 150,


      y:
      Math.random() * 200 - 100

    });

  };




  return (

    <div className="invitation-scene">



      {/* MAGIC ENVELOPE */}

      {!opened && !accepted && (

        <motion.div

          className="magic-envelope"

          initial={{
            opacity:0,
            scale:.4,
            y:100
          }}

          animate={{
            opacity:1,
            scale:1,
            y:0
          }}

          transition={{
            duration:1.5
          }}

          onClick={openMagic}

        >

          <div className="envelope-glow"></div>


          <div className="envelope">

            💌

          </div>


          <h2>

            ✨ OPEN THE MAGIC ✨

          </h2>


        </motion.div>

      )}




      {/* INVITATION */}

      {opened && !accepted && (

        <motion.div

          className="church-invitation"

          initial={{
            opacity:0,
            scale:.5
          }}

          animate={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:1
          }}

        >


          <h1>

            ✨ CHURCH INVITATION ✨

          </h1>



          <h2>

            ⛪ CHURCH DATE

          </h2>



          <p>
            📅 01 AUGUST 2026
          </p>


          <p>
            📍 MAKATI CITY
          </p>


          <p>
            ⏰ 6:00 PM
          </p>



          <div className="invite-buttons">


            <button

              className="accept-btn"

              onClick={acceptInvitation}

            >

              ACCEPT

            </button>




            <motion.button

              className="decline-btn"

              animate={{

                x:declinePosition.x,

                y:declinePosition.y

              }}

              transition={{
                duration:.3
              }}


              onMouseEnter={
                declineInvitation
              }


              onClick={
                declineInvitation
              }


            >

              DECLINE

            </motion.button>


          </div>


        </motion.div>

      )}




      {/* ACCEPT MAGIC RESULT */}

      {accepted && (

        <motion.div

          className="lylia-arrival"

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

        >


          <div className="magic-explosion"></div>



          <motion.img

            src="/images/mage.png"

            className="accept-lylia"


            initial={{

              opacity:0,

              scale:.2,

              y:200

            }}


            animate={{

              opacity:1,

              scale:1,

              y:0

            }}


            transition={{

              duration:2,

              ease:"easeOut"

            }}

          />



          <h1>

            ✨ SEE YAH ✨

          </h1>



        </motion.div>

      )}



    </div>

  );

}