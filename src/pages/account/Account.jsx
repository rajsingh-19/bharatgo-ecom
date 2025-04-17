import React from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./account.module.css";
import { TbHandFingerLeft } from "react-icons/tb";

const Account = () => {
  return (
    <>
      <Navbar />
      <div className={styles.accountContainer}>
        <p>My Account</p>
        <div className={styles.accCard}>
          <p>Created By :</p>
          <div className={styles.profileImgContainer}>
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c013d2f7-077a-4361-90ca-d83a86af59f9/ddn88n0-0ce7ba32-9308-4393-a7ce-24fbf3ae0849.jpg/v1/fit/w_828,h_1172,q_70,strp/drawing_a_anime_boy_step_by_step_for_beginners_by_drawingtimewithme_ddn88n0-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgxMSIsInBhdGgiOiJcL2ZcL2MwMTNkMmY3LTA3N2EtNDM2MS05MGNhLWQ4M2E4NmFmNTlmOVwvZGRuODhuMC0wY2U3YmEzMi05MzA4LTQzOTMtYTdjZS0yNGZiZjNhZTA4NDkuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pD47P5gtkBTygfW5jdo6pIgyXRJUQFkv2dev07uOEcU" alt="Profile Image" />
          </div>
          <p>Raj Singh</p>
          <p>@rajsingh <TbHandFingerLeft size={17} /></p>
        </div>  
      </div>
    </>
  )
}

export default Account;
