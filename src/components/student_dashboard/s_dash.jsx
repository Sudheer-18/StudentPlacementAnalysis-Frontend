import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreSummary from './ScoreSummary';
import './Dashboard.css';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [logi, setLogi] = useState(false)
  const email = localStorage.getItem('loginuser');
  console.log(email)

  useEffect(() => {
    if (!email) return;
    if (!(localStorage.getItem("loginuser") === null)) {
      setLogi(true)
    }
    axios
      .post('https://projectspace-backend.onrender.com/get-student-by-email', { email })
      .then((res) => setStudent(res.data))
      .catch(console.error);
  }, [email]);



  if (!student) return (logi ? <div className="loading">Loading...</div> : <div className="loading">sigin to dashboard</div>)

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <div className="profile-banner">
          <div className="profile-info">
            <h2>{student.name}</h2>
            <p>{student.email}</p>
          </div>
        </div>

        <div className="main-content12">

          {/* Coding Contests */}
          {/* <section className="section123">
          <h1>Coding Contests</h1>
          {student.codingContestsTaken.length === 0 ? (
            <p className="empty-msg">You haven't taken any coding contests yet.</p>
          ) : (
            <div className="card-container">
              {student.codingContestsTaken.map((c, i) => (
                <div className="card" key={i}>
                  <p><strong>Code:</strong> {c.contestCode}</p>
                  <p><strong>Score:</strong> {c.score}</p>
                  <p><strong>Date:</strong> {new Date(c.dateTaken).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </section> */}
          <h1 className='heading'>Coding Contests</h1>
          {student.codingContestsTaken.length === 0 ? (
            <div className="no-records">
              <p>You haven't taken any coding contests yet.</p>
            </div>

          ) : (
            <div className="table-wrapper">
              <table className="contest-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Code</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student.codingContestsTaken.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.contestCode}</td>
                      <td>{c.score}</td>
                      <td>{new Date(c.dateTaken).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          {/* AI Interviews */}
          <h1 className='heading'>AI Interviews</h1>
          {student.aiMockInterviewsTaken.length === 0 ? (
            <div className="no-records">
              <p>You haven't taken any AI Interviews yet.</p>
            </div>

          ) : (
            <div className="table-wrapper">
              <table className="contest-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Code</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student.aiMockInterviewsTaken.map((a, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{a.interviewCode}</td>
                      <td>{a.score}</td>
                      <td>{new Date(a.dateTaken).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          {/* MCQ Tests */}
          <h1 className='heading'>MCQ Tests</h1>
          {student.mcqTestsTaken.length === 0 ? (
            <div className="no-records">
              <p>You haven't taken any MCQ Tests yet.</p>
            </div>

          ) : (
            <div className="table-wrapper">
              <table className="contest-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Code</th>
                    <th>Technology</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student.mcqTestsTaken.map((m, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{m.testCode}</td>
                      <td>{m.technology}</td>
                      <td>{m.score}</td>
                      <td>{new Date(m.dateTaken).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary */}
          <ScoreSummary student={student} />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;