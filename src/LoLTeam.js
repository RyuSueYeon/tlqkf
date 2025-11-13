/* eslint-disable */

import React, { useState } from 'react';
import './LoLTeam.css';

function LoLTeam() {
  // 등록된 모든 멤버를 저장하는 상태
  const [members, setMembers] = useState([
    { name: 'Alice', tier: '골드', position1: 'TOP', position2: 'MID' },
    { name: 'Bob', tier: '실버', position1: 'JUG', position2: 'ADC' },
    { name: 'Charlie', tier: '플래티넘', position1: 'MID', position2: 'TOP' },
    { name: 'Diana', tier: '브론즈', position1: 'ADC', position2: 'SUB' },
    { name: 'Eve', tier: '다이아몬드', position1: 'SUB', position2: 'JUG' },
    { name: 'Frank', tier: '골드', position1: 'TOP', position2: 'JUG' },
    { name: 'Grace', tier: '실버', position1: 'MID', position2: 'ADC' },
    { name: 'Hank', tier: '플래티넘', position1: 'ADC', position2: 'SUB' },
    { name: 'Ivy', tier: '브론즈', position1: 'SUB', position2: 'TOP' },
    { name: 'Jack', tier: '다이아몬드', position1: 'JUG', position2: 'MID' },
  ]);
  // 팀 배정을 위해 선택된 멤버를 저장하는 상태
  const [selectedMembers, setSelectedMembers] = useState([]);
  // 배정된 팀 정보를 저장하는 상태
  const [teams, setTeams] = useState(null);

  // 선택 가능한 포지션과 티어 목록
  const positions = ['TOP', 'JUG', 'MID', 'ADC', 'SUB', 'ALL'];
  const TIERS = ['아이언', '브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터', '그랜드마스터', '챌린저'];

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

  const handleEdit = (index) => {
    const member = members[index];
    const form = document.querySelector('form');
    form.name.value = member.name;
    form.tier.value = member.tier;
    form.position1.value = member.position1;
    form.position2.value = member.position2;

    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    setSelectedMembers(selectedMembers.filter((name) => name !== member.name));
  };

  const handleDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
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
        <input type="text" name="name" defaultValue="이름" required onFocus={(e) => e.target.select()} /> 

        {/* 티어 선택칸 */}
        <select name="tier" required style={{ padding: '6px', fontSize: '16px', cursor: 'pointer' }}>
          <option value="" disabled selected>티어</option>
          {TIERS.map((tier) => (
            <option key={tier} value={tier}>
              {tier}
            </option>
          ))}
        </select>

        {/* 포지션 선택칸 */}
        <select name="position1" required style={{ padding: '6px', fontSize: '16px', cursor: 'pointer', width: '100px' }}>
          <option value="" disabled selected>주포</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

          {/* 두 번째 포지션 선택칸 */}
        <select name="position2" required style={{ padding: '6px', fontSize: '16px', cursor: 'pointer', width: '100px' }}>
          <option value="" disabled selected>부포</option>
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
        {members.map((member, index) => (
          <li key={member.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '7px', fontFamily: 'Arial, sans-serif' }}>
            <input
              type="checkbox"
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
              checked={selectedMembers.includes(member.name)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMembers([...selectedMembers, member.name]);
                } else {
                  setSelectedMembers(selectedMembers.filter((name) => name !== member.name));
                }
              }}
            />
            <span style={{ flex: 1, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ width: '30%' }}>{index + 1}. {member.name}</span>
              <span style={{ width: '20%' }}>티어: {member.tier}</span>
              <span style={{ width: '40%' }}>포지션: {member.position1}, {member.position2}</span>
            </span>
            <button
              onClick={() => handleEdit(index)}
              style={{ marginRight: '10px' }}
            >
              편집
            </button>
            <button
              onClick={() => handleDelete(index)}
            >
              삭제
            </button>
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
          <h2>레드팀</h2>
          {positions.slice(0, 5).map((position) => (
            <div key={position}>
              <h3>{position}</h3>
              <ul>
                {teams.team1
                  .filter((member) => member.position1 === position || member.position2 === position)
                  .map((member) => (
                    <li key={member.name}>
                      {position} : {member.name} - 티어 : {member.tier}
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <h2>블루팀</h2>
          {positions.slice(0, 5).map((position) => (
            <div key={position}>
              <h3>{position}</h3>
              <ul>
                {teams.team2
                  .filter((member) => member.position1 === position || member.position2 === position)
                  .map((member) => (
                    <li key={member.name}>
                      {position} : {member.name} - 티어 : {member.tier}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoLTeam;
