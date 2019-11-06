import PropTypes from 'prop-types'

const table = (props) => {
  const { finalists, primaryColor, smallerDesign, largeColumns, track } = props
  const smallClass = smallerDesign ? ' small ' : ''
  const sizeClass = largeColumns ? ' largerCells ' : ''
  const trackTableClass = (track) => {
    switch (track) {
      case 'algorithm': return 'algorithmTable'
      case 'first2finish': return 'f2fTable'
    }
    return ''
  }
  const algorithmLeaderboard = track === 'algorithm'
  const f2fLeaderboard = track === 'first2finish'
  return (
    <div className={'container' + smallClass + sizeClass + `${trackTableClass(track)}`}>
      <div className='header'>
        <div className='rank'>RANK</div>
        <div className='competitor'>competitor</div>
        { largeColumns && algorithmLeaderboard && <div className='algorithmFieldCell'>
          250
        </div>}
        { largeColumns && algorithmLeaderboard && <div className='algorithmFieldCell'>
          500
        </div>}
        { largeColumns && algorithmLeaderboard && <div className='algorithmFieldCell'>
          1000
        </div> }
        { largeColumns && f2fLeaderboard && <div className='f2fPblmCell'>
          Problem 1
        </div> }
        { largeColumns && f2fLeaderboard && <div className='f2fTestCell'>
          TESTS PASSED/TOTAL
        </div> }
        { largeColumns && f2fLeaderboard && <div className='f2fPblmCell'>
          Problem 2
        </div> }
        { largeColumns && f2fLeaderboard && <div className='f2fTestCell'>
          TESTS PASSED/TOTAL
        </div> }
        { largeColumns && f2fLeaderboard && <div className='f2fPblmCell'>
          Problem 3
        </div> }
        { largeColumns && f2fLeaderboard && <div className='f2fTestCell'>
          TESTS PASSED/TOTAL
        </div> }
        <div className='points'>points</div>
        {!smallerDesign && !algorithmLeaderboard && !f2fLeaderboard && <div className='tests-passed'>tests passed</div>}
      </div>
      { finalists.map((profile, i) => (
        <div key={i} className='row'>
          <div className='rank'>
            <div className='rank-overlay' />
            <div className='rank-text' style={{ opacity: profile.hasOwnProperty('profilePic') ? '1' : '0.3' }}>
              {i + 1}
            </div>
          </div>

          { profile.hasOwnProperty('points') && !algorithmLeaderboard && !f2fLeaderboard && <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between' }}>
            <div className='competitor'>
              <div className='avatar'>
                <img src={profile.profilePic} />
              </div>
              <img className='country-flag' src={profile.countryFlag} />
              <div className='handle' style={{ color: primaryColor }}>{profile.handle}</div>
            </div>

            <div className='points'>
              { profile.hasOwnProperty('scoreLevel') && <img src={`/static/img/trend/${profile.scoreLevel}.png`} /> }
              { profile.points.length > 0 && <div>
                <span className='value'>
                  {profile.points}
                </span>
                <span className='hint'>
                  POINTS
                </span>
              </div> }
            </div>

            {!smallerDesign && !algorithmLeaderboard && !f2fLeaderboard && <div className='tests-passed'>
              <div>
                <span className='value'>
                  {profile.testsPassed} / {profile.totalTestCases}
                </span>
                <span className='hint'>
                  TESTS
                </span>
              </div>
            </div>}

          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('handle') && <div className='handleName'>
            {profile.handle}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('roundOne') && <div className={'algorithmFieldCell ' + (profile.roundOne === 'fail' ? 'fail' : '')}>
            {profile.roundOne}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('roundTwo') && <div className={'algorithmFieldCell ' + (profile.roundTwo === 'fail' ? 'fail' : '')}>
            {profile.roundTwo}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('roundThree') && <div className={'algorithmFieldCell ' + (profile.roundThree === 'fail' ? 'fail' : '')}>
            {profile.roundThree}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('points') && <div className='totalPoints algorithmFieldCell'>
            {profile.points}
          </div> }

          { largeColumns && f2fLeaderboard && profile.hasOwnProperty('handle') && <div className='handleName'>
            {profile.handle}
          </div> }

          { largeColumns && f2fLeaderboard && profile.hasOwnProperty('problem') && profile.problem.map((problem, i) => (
            <div key={i} className='f2fScoreTests'>
              <div className='f2fFieldCell'>{problem.score}</div>
              <div className='f2fFieldCell'>
                {problem.testsPassed}{problem.testsPassed.length > 0 && problem.totalTestCases.length > 0 && <span>/</span>}{problem.totalTestCases}
              </div>
            </div>
          )) }

          { largeColumns && f2fLeaderboard && profile.hasOwnProperty('points') && <div className='f2fPoints f2fFieldCell'>
            {profile.points}
          </div> }

          { profile.hasOwnProperty('status') && <div className='status' style={{ opacity: profile.hasOwnProperty('points') ? '1' : '0.3' }}>
            {profile.status}
          </div>
          }
        </div>
      ))

      }
      <style jsx>
        {`
          .container {
            height: 100%;
            box-shadow: -1px 0px 10px 0px #0000005c;
            z-index: 3;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .row {
            display: flex;
            min-height: 62px;
            height: 62px;
            overflow: hidden;
            color: #ffffff;
            flex-grow: 1;
            background-image: linear-gradient(180deg,rgba(13, 30, 90, 0.5) 0%,rgba(0, 1, 17, 0.5) 94%);
            box-shadow: inset 0 -1px 15px 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          }

          .largerCells .row {
            min-height: 70px;
            height: 70px;
          }

          .rank-overlay {
            background: linear-gradient(180deg,rgba(13,30,90,0.5) 0%,rgba(0,1,17,0.5) 94%);
            box-shadow: 2px 2px 9px 0 #000000, inset 0 1px 0 0 rgba(255,255,255,0.20);
            width: 100%;
            height: 100%;
            transform: skew(-15deg);
            position: absolute;
            left: -17px;
            width: 120%;
            z-index: -1;
          }

          .largerCells .rank-overlay {
            left: -25px;
            transform: skew(-21deg);
          }

          .rank-text {
            line-height: 70px;
            text-align: center;
            height: 100%;
            z-index: 3;
            color: #FFFFFF;
            font-family: Helvetica;
            font-size: 2em;
            font-weight: 700;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .header {
            background-color: #002133;
            height: 48px;
            min-height: 48px;
            color: #ffffff77;
            font-family: Helvetica;
            font-size: 1em;
            font-weight: 700;
            line-height: 48px;
            text-align: center;
            display: flex;
            text-transform: uppercase;
            z-index: -1;
          }

          .rank {
            min-width: 70px;
            height: 100%;
            position: relative;
            z-index: 1;
          }

          .largerCells .rank {
            min-width: 94px;
          }

          .competitor {
            width: 180px;
            position: relative;
            text-align: left;
            font-size: 0.9375em;
          }

          .small .competitor {
            width: 250px;
          }

          .row .competitor {
            display: flex;
            align-items: center;
          }

          .avatar {
            height: 100%;
            width: 70px;
            transform: skew(-14deg);
            overflow: hidden;
            left: -3px;
            position: absolute;
          }

          .avatar img {
            height: 125px;
            margin-top: -18px;
            margin-left: -15px;
            transform: skew(14deg);
          }

          .country-flag {
            height: 26px;
            width: 24px;
            position: absolute;
            z-index: 3;
            left: 45px;
            bottom: 10px;
          }

          .handle {
            margin-left: 90px;
            font-size: 1.5625em;
            font-weight: 800;
            width: 198px;
            text-align: left;
          }

          .points {
            width: 122px;
            text-align: center;
          }

          .row .points {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 15px;
          }

          .largerCells .points {
            width: 160px;
          }

          .largerCells .competitor {
            width: 300px;
          }

          .row span {
            display: block;
          }

          .hint {
            font-size: 0.9375em;
            font-weight: 700;
            opacity: 0.300000011920929;
            width: 54px;
            text-align: left;
          }

          .value {
            font-size: 1.75em;
            font-weight: 700;
            text-align: left;
          }

          .points img {
            width: 18.5px;
            margin-right: 10px;
          }

          .tests-passed {
            width: 120px;
          }

          .row .tests-passed {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .status {
            color: #FFFFFF;
            font-size: 1.25em;
            font-weight: 700;
            opacity: 0.300000011920929;
            width: 100%;
            text-align: center;
            line-height: 70px;
            text-transform: uppercase;
          }

          .small .status {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            text-transform: uppercase;
            padding-right: 20px;
          }

          .algorithmTable .competitor,
          .algorithmTable .handleName {
            width: 60%;
            padding-left: 30px;
          }

          .algorithmTable .handleName,
          .f2fTable .handleName {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 1.5625em;
            font-weight: 700;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            opacity: 0.87;
          }

          .algorithmTable .header,
          .f2fTable .header {
            text-align: left;
          }

          .algorithmTable .algorithmFieldCell {
            display: flex;
            align-items: center;
            width: 15%;
          }

          .algorithmTable .points {
            display: flex;
            align-items: center;
            width: 15%;
          }

          .algorithmTable .row .algorithmFieldCell {
            color: #5CC900;
            font-family: Roboto;
            font-size: 1.5625em;
            font-weight: 700;
            text-transform: uppercase;
          }

          .algorithmTable .row .algorithmFieldCell.fail {
            color: #F21919;
          }

          .algorithmTable .points,
          .f2fTable .points {
            text-align: left;
          }

          .algorithmTable .rank,
          .f2fTable .rank {
            text-align: center;
          }

          .f2fTable .competitor,
          .f2fTable .handleName {
            width: 20%;
            padding-left: 30px;
          }

          .f2fTable .f2fTestCell {
            width: 15%;
          }

          .f2fTable .f2fPblmCell {
            width: 8%;
          }

          .f2fTable .f2fPoints {
            width: 10%;
          }

          .f2fTable .points {
            width: 10%;
          }

          .f2fFieldCell {
            display: flex;
            align-items: center;
            color: #5CC900;
            font-family: Roboto;
            font-size: 1.5625em;
            font-weight: 700;
            text-transform: uppercase;
          }

          .f2fFieldCell.f2fTestCell {
            font-weight: 400;
          }

          .f2fScoreTests {
            display: flex;
            width: 23%;
          }

          .f2fScoreTests .f2fFieldCell:first-child {
            width: 34%;
          }

          .f2fScoreTests .f2fFieldCell:nth-child(2) {
            width: 66%;
            font-weight: 400;
          }

          @media only screen and (min-width:1800px){
            .competitor {
              width: 250px;
            }
          }
          
          @media only screen and (min-width:1920px){
            .competitor {
              width: 320px;
            }

            .handle {
              font-size: 1.125em;
            }
          }
        `}
      </style>
    </div>
  )
}

table.propTypes = {
  finalists: PropTypes.arrayOf(PropTypes.object).isRequired,
  primaryColor: PropTypes.string.isRequired,
  smallerDesign: PropTypes.bool,
  largeColumns: PropTypes.bool,
  track: PropTypes.string
}

table.defaultProps = {
  smallerDesign: false,
  largeColumns: false,
  track: ''
}

export default table
