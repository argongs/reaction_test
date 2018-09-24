var svg_content = document.getElementById("svg_shape")
var note = document.getElementById("note")
var t_notifier = document.getElementById('timer')
var input_char = document.getElementById('input')
var display_answer = document.getElementById('display_answer')
var answer_status = document.getElementById('answer_status')
var L_info = document.getElementById('L_info')
input_char.value = ""
var max_round = 16, round_count = 1, correct_count = 0, resp_time = [], sum_time = 0
var L_hit = 0
var count_down = 1, min_time = 0, max_time = 0, avg_time = 0
var color_code = 0
var start = 0, end = 0, time_diff = 0

function main(event)
{

  var key = event.keyCode
  var seconds = 0

  if (round_count <= max_round)
  {
    if (round_count == max_round)
    {
      L_info.innerHTML = 'Tap the <span class="badge badge-secondary">L</span> Key to see your results'
    }

    if (key == 76)
    {
      note.innerHTML = 'Round '+round_count+' of '+max_round
      L_hit = 1
      //setTimeout(timer, 1000)
      //setTimeout(timer, 2000)
      input_char.disabled = true
      setTimeout(combine, 10)
      L_info.innerHTML = 'Tap the <span class="badge badge-secondary">L</span> Key to go to the next round'
      //svg_content.innerHTML = '<circle cx="200" cy="200" r="150" stroke="black" stroke-width="3" fill="black" />'
    }
    else if ((key == 82 || key == 89 || key == 71) && (L_hit ==1))
    {
      end = new Date().getTime()
      time_diff = end - start

      svg_content.innerHTML = '<circle cx="200" cy="200" r="150" stroke="black" stroke-width="3" fill="white" />'

      if (color_code == key)
      {
        answer_status.setAttribute("src", "img/correct.png")
        display_answer.setAttribute("class", "bg-success")
        display_answer.innerHTML = "Correct Answer @ "+time_diff+ " milliseconds"
        correct_count++
        console.log("Score : "+correct_count);
        sum_time = sum_time + time_diff

        resp_time.push(time_diff)
        // if (time_diff < min_time)
        // {
        //   min_time = time_diff
        // }
        L_hit = 0
      }
      else
      {
        answer_status.setAttribute("src", "img/wrong.png")
        display_answer.setAttribute("class", "bg-danger")
        display_answer.innerHTML ="Incorrect Answer @ "+time_diff+ " milliseconds"
        L_hit = 0
      }

      round_count = round_count + 1

      reset()
    }
  }
  else
  {
    summary()

    svg_content.innerHTML = '<circle cx="200" cy="200" r="150" fill="red" >\
                    <animate id="c1" attributeName="r" attributeType="XML" begin="0s" dur="2s" fill="freeze" from="20" to="150" />\
                  </circle>\
                  <circle cx="200" cy="200" r="150" fill="yellow" >\
                    <animate id="c2" attributeName="r" attributeType="XML" begin="0s" dur="2s" fill="freeze" from="20" to="120" />\
                  </circle>\
                  <circle cx="200" cy="200" r="150" fill="green" >\
                    <animate id="c3" attributeName="r" attributeType="XML" begin="0s" dur="2s" fill="freeze" from="20" to="90" />\
                  </circle>'

    note.style = "font-size: 150%; letter-spacing: 3px;"
    note.innerHTML = "Your results are out!<br>"
    L_info.innerHTML = "Hit the button below to restart"

    t_notifier.style = "font-size: large; letter-spacing: 3px;"
    t_notifier.innerHTML = "You have scored "+correct_count+" out of "+max_round

    input_char.style.display = "none"

    answer_status.setAttribute("src", "img/clock.jpg")
    display_answer.setAttribute("class", "table-responsive")
    display_answer.innerHTML = '<table class="table table-hover">\
                                  <caption>The above results are calculated only for the correct answers</caption>\
                                  <tbody>\
                                   <thead class="thead-dark">\
                                      <tr>\
                                        <th scope="col">Response Category</th>\
                                        <th scope="col">Time (milliseconds)</th>\
                                      </tr>\
                                   </thead>\
                                   <tr class = "bg-success">\
                                     <td scope="row">Minimum Response Time </td>\
                                     <td scope="row">'+min_time+'</td>\
                                   </tr>\
                                   <tr class = "bg-warning">\
                                     <td scope="row">Average Response Time </td>\
                                     <td scope="row">'+avg_time+'</td>\
                                   </tr>\
                                   <tr class = "bg-danger">\
                                     <td scope="row">Maximum Response Time </td>\
                                     <td scope="row">'+max_time+'</td>\
                                   </tr>\
                                  </tbody>\
                                </table>'
	//console.log(min_time);
  }

}

function combine()
{
  timer()
  changeColor()
  start = new Date().getTime()
  /*input.addEventListener('onkeydown', function (e) {
    start = e.timeStamp
  })*/
  count_down = 1
}

function changeColor()
{
  var color = Math.floor((Math.random() * 3) + 1);
  switch (color)
  {
    case 1: svg_content.innerHTML = '<circle cx="200" cy="200" r="150" stroke="black" stroke-width="3" fill="red" />'
            color_code = 82
            break;
    case 2: svg_content.innerHTML = '<circle cx="200" cy="200" r="150" stroke="black" stroke-width="3" fill="yellow" />'
            color_code = 89
            break;
    case 3: svg_content.innerHTML = '<circle cx="200" cy="200" r="150" stroke="black" stroke-width="3" fill="green" />'
            color_code = 71
            break;
  }
}

function timer()
{
  switch (count_down) {
    case 2: t_notifier.setAttribute("class", "text-danger")
            t_notifier.innerHTML = "Status : Ready... Steady.."
            break;
    //case 2: t_notifier.setAttribute("class", "text-warning")
    //        t_notifier.innerHTML = "Status : Steady.."
    //        break;
    case 1: t_notifier.setAttribute("class", "text-success")
            t_notifier.innerHTML = "Status : GO!"
            input_char.disabled = false
            input_char.focus()
            break;
  }
  count_down--
}

function reset()
{
  count_down = 1
  input_char.value = ""
  start = 0
  end = 0
  time_diff = 0

  // if(par == 0)
  // {
  //   t_notifier.innerHTML = ""
  //   correct_count = 0
  //   round_count = 0
  // }
}

function summary()
{
  var temp_max = 0, temp_min = Infinity

  for (var i = 0; i < max_round; i++)
  {
    if (resp_time[i] < temp_min)
    {
      temp_min = resp_time[i]
    }

    if (resp_time[i] > temp_max)
    {
      temp_max = resp_time[i]
    }
  }


  min_time = temp_min
  max_time = temp_max
  avg_time = sum_time/correct_count

  if (temp_min == Infinity)
  {
    min_time = "Not available"
  }
  if (temp_max == 0)
  {
    max_time = "Not available"
    avg_time = "Not available"
  }

}
