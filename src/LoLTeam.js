/* eslint-disable */

import React, { useState } from 'react';
import './LoLTeam.css';

function LoLTeam() {
  // 등록된 모든 멤버를 저장하는 상태
  const [members, setMembers] = useState([]);
  // 팀 배정을 위해 선택된 멤버를 저장하는 상태
  const [selectedMembers, setSelectedMembers] = useState([]);
  // 배정된 팀 정보를 저장하는 상태
  const [teams, setTeams] = useState(null);

  // 선택 가능한 포지션과 티어 목록
  const positions = ['TOP', 'JUG', 'MID', 'ADC', 'SUB', '상관없음'];
  const TIERS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'];

  // 새로운 멤버를 추가하는 함수
  const addMember = (name, tier, position1, position2) => {
    setMembers([...members, { name, tier, position1, position2 }]);
  };

  // 선택된 멤버를 기반으로 팀을 배정하는 함수
  const assignTeams = () => {
    // 등록된 멤버 중 선택된 멤버를 찾음
    const players = selectedMembers.map((name) => members.find((m) => m.name === name));

    // 티어를 기준으로 멤버를 정렬 (TIERS 배열을 사용하여 순위 비교)
    players.sort((a, b) => TIERS.indexOf(b.tier) - TIERS.indexOf(a.tier));

    const team1 = [];
    const team2 = [];

    // 멤버를 번갈아가며 team1과 team2에 배정
    players.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });

    // 배정된 팀 정보를 상태에 저장
    setTeams({ team1, team2 });
  };

  return (
    <div className="lol-team">
      <h1>롤 내전 팀 배정</h1>

      {/* 새로운 멤버를 등록하는 폼 */}
      <h2>멤버 등록</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const name = form.name.value;
          const tier = form.tier.value;
          const position1 = form.position1.value;
          const position2 = form.position2.value;
          addMember(name, tier, position1, position2); //저장한 값을 실제 멤버로 추가
          form.reset();
        }}
      >
        {/* 이름 입력칸 */}
        <input type="text" name="name" placeholder="이름" required /> 

        {/* 티어 선택칸 */}
        <select name="tier" require style={{ padding: '8px', fontSize: '16px', cursor: 'pointer' }}>
          {TIERS.map((tier) => (
            <option key={tier} value={tier}>
              {tier}
            </option>
          ))}
        </select>

        {/* 포지션 선택칸 */}
        <select name="position1" required style={{ padding: '8px', fontSize: '16px', cursor: 'pointer' }}>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

          {/* 두 번째 포지션 선택칸 */}
        <select name="position2" required style={{ padding: '8px', fontSize: '16px', cursor: 'pointer' }}>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        {/* 등록 버튼 onsubmit 함수가 실행*/}
        <button type="submit">멤버 추가</button>
      </form>

      {/* 등록된 멤버 목록과 체크박스를 통한 선택 */}
      <h2>수연이보다 롤 못하는 놈들</h2>
      <ul>
        {members.map((member) => (
          <li key={member.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedMembers.includes(member.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMembers([...selectedMembers, member.name]);
                  } else {
                    setSelectedMembers(selectedMembers.filter((name) => name !== member.name));
                  }
                }}
              />
              {member.name} - 티어: {member.tier} - 포지션: {member.position1}, {member.position2}
            </label>
          </li>
        ))}
      </ul>

      {/* 팀 배정 버튼 (10명이 선택된 경우에만 활성화) */}
      <button onClick={assignTeams} disabled={selectedMembers.length !== 10}>
        팀 배정
      </button>

      {/* 배정된 팀을 화면에 표시 */}
      {teams && (
        <div>
          <h2>팀 1 (레드)</h2>
          <ul>
            {teams.team1.map((member) => (
              <li key={member.name}>{member.name} - 티어: {member.tier}</li>
            ))}
          </ul>

          <h2>팀 2 (블루)</h2>
          <ul>
            {teams.team2.map((member) => (
              <li key={member.name}>{member.name} - 티어: {member.tier}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LoLTeam;
