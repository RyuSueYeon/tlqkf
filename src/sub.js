/* eslint-disable */

import React, { useState } from 'react';
import './sub.css';

function Sub() {
  // 친구 목록 (이름, 티어, 주 포지션)
  const [friends] = useState([
    { id: 1, name: '수연', tier: '실버', position: 'ALL' },
    { id: 2, name: '재성', tier: '아이언', position: '남는거' },
    { id: 3, name: '형락', tier: '실버', position: 'ALL' },
    { id: 4, name: '의찬', tier: '에메랄드', position: 'ALL' },
    { id: 5, name: '강현', tier: '골드', position: 'ALL' },
    { id: 6, name: '가온', tier: '아이언', position: '미드' },
    { id: 7, name: '지훈', tier: '다이아', position: 'ALL' },
    { id: 8, name: '강윤', tier: '골드', position: 'ALL' },
    { id: 9, name: '진영', tier: '플레', position: '서폿' },
    { id: 10, name: '연우', tier: '플레', position: '탑' },
    { id: 11, name: '다정', tier: '플레', position: '미드/탑' },
    { id: 12, name: '채원', tier: '플레', position: '미드/탑' },

  ]);

  // 팀 1 (레드팀) - 5명
  const [redTeam, setRedTeam] = useState([null, null, null, null, null]);
  
  // 팀 2 (블루팀) - 5명
  const [blueTeam, setBlueTeam] = useState([null, null, null, null, null]);

  // 드래그 시작 시 호출
  const handleDragStart = (e, friend) => {
    e.dataTransfer.setData('friend', JSON.stringify(friend));
  };

  // 드롭 허용
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 친구 목록 영역에 드롭
  const handleDropToFriends = (e) => {
    e.preventDefault();
    const friend = JSON.parse(e.dataTransfer.getData('friend'));
    
    // 레드팀에서 제거
    setRedTeam(redTeam.map(f => f?.id === friend.id ? null : f));
    
    // 블루팀에서 제거
    setBlueTeam(blueTeam.map(f => f?.id === friend.id ? null : f));
  };

  // 팀 슬롯에 드롭
  const handleDropToTeam = (e, team, index) => {
    e.preventDefault();
    const friend = JSON.parse(e.dataTransfer.getData('friend'));
    
    // 이미 다른 팀에 있는지 확인하고 제거
    if (team === 'red') {
      const newRedTeam = [...redTeam];
      // 다른 슬롯에서 제거
      const existingIndex = newRedTeam.findIndex(f => f?.id === friend.id);
      if (existingIndex !== -1) {
        newRedTeam[existingIndex] = null;
      }
      // 블루팀에서도 제거
      setBlueTeam(blueTeam.map(f => f?.id === friend.id ? null : f));
      
      newRedTeam[index] = friend;
      setRedTeam(newRedTeam);
    } else {
      const newBlueTeam = [...blueTeam];
      // 다른 슬롯에서 제거
      const existingIndex = newBlueTeam.findIndex(f => f?.id === friend.id);
      if (existingIndex !== -1) {
        newBlueTeam[existingIndex] = null;
      }
      // 레드팀에서도 제거
      setRedTeam(redTeam.map(f => f?.id === friend.id ? null : f));
      
      newBlueTeam[index] = friend;
      setBlueTeam(newBlueTeam);
    }
  };

  // 친구가 이미 팀에 배정되었는지 확인
  const isFriendAssigned = (friendId) => {
    return redTeam.some(f => f?.id === friendId) || blueTeam.some(f => f?.id === friendId);
  };

  // 팀 초기화
  const resetTeams = () => {
    setRedTeam([null, null, null, null, null]);
    setBlueTeam([null, null, null, null, null]);
  };

  return (
    <div className="sub" style={{ padding: '20px' }}>
      <h1>롤 내전 팀 배정 (드래그 앤 드롭)</h1>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
        {/* 친구 목록 */}
        <div 
          style={{ 
            flex: 1,
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            minHeight: '400px'
          }}
          onDrop={handleDropToFriends}
          onDragOver={handleDragOver}
        >
          <h2>친구 목록</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {friends.map((friend) => (
              <div
                key={friend.id}
                draggable={!isFriendAssigned(friend.id)}
                onDragStart={(e) => handleDragStart(e, friend)}
                style={{
                  padding: '12px',
                  backgroundColor: isFriendAssigned(friend.id) ? '#ccc' : '#fff',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  cursor: isFriendAssigned(friend.id) ? 'not-allowed' : 'move',
                  opacity: isFriendAssigned(friend.id) ? 0.5 : 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{friend.name}</span>
                <div style={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>티어: {friend.tier}</span>
                  <span style={{ color: '#666' }}>포지션: {friend.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 팀 배정 테이블 */}
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2>팀 배정</h2>
            <button 
              onClick={resetTeams}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              초기화
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* 레드팀 */}
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: 'center', color: '#dc3545' }}>레드팀</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '2px solid #dc3545', padding: '10px', backgroundColor: '#ffebee' }}>
                      포지션
                    </th>
                    <th style={{ border: '2px solid #dc3545', padding: '10px', backgroundColor: '#ffebee' }}>
                      선수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((position, index) => (
                    <tr key={position}>
                      <td style={{ 
                        border: '2px solid #dc3545', 
                        padding: '10px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#ffebee'
                      }}>
                        {position}
                      </td>
                      <td
                        style={{
                          border: '2px solid #dc3545',
                          padding: '15px',
                          minHeight: '60px',
                          backgroundColor: redTeam[index] ? '#fff' : '#ffe0e0',
                          cursor: 'pointer'
                        }}
                        onDrop={(e) => handleDropToTeam(e, 'red', index)}
                        onDragOver={handleDragOver}
                      >
                        {redTeam[index] ? (
                          <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                              {redTeam[index].name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {redTeam[index].tier} | {redTeam[index].position}
                            </div>
                          </div>
                        ) : (
                          <div style={{ color: '#999', textAlign: 'center' }}>
                            드래그하여 추가
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 블루팀 */}
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: 'center', color: '#007bff' }}>블루팀</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '2px solid #007bff', padding: '10px', backgroundColor: '#e3f2fd' }}>
                      포지션
                    </th>
                    <th style={{ border: '2px solid #007bff', padding: '10px', backgroundColor: '#e3f2fd' }}>
                      선수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((position, index) => (
                    <tr key={position}>
                      <td style={{ 
                        border: '2px solid #007bff', 
                        padding: '10px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: '#e3f2fd'
                      }}>
                        {position}
                      </td>
                      <td
                        style={{
                          border: '2px solid #007bff',
                          padding: '15px',
                          minHeight: '60px',
                          backgroundColor: blueTeam[index] ? '#fff' : '#e0f0ff',
                          cursor: 'pointer'
                        }}
                        onDrop={(e) => handleDropToTeam(e, 'blue', index)}
                        onDragOver={handleDragOver}
                      >
                        {blueTeam[index] ? (
                          <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                              {blueTeam[index].name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {blueTeam[index].tier} | {blueTeam[index].position}
                            </div>
                          </div>
                        ) : (
                          <div style={{ color: '#999', textAlign: 'center' }}>
                            드래그하여 추가
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub;
