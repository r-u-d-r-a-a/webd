//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var cnt = 1;
var toggleExpand = true;
var deleteColumn = true;

function addRow() {

  try{

    var table = document.getElementById("myTable");
    var row = table.insertRow(-1); 
    var checkBox = row.insertCell(0);
    var student = row.insertCell(1);
    var advisor = row.insertCell(2);
    var status = row.insertCell(3);
    var semester = row.insertCell(4);
    var type = row.insertCell(5);
    var budget = row.insertCell(6);
    var percentage = row.insertCell(7);
  
    checkBox.innerHTML = "<input type='checkbox' onclick='selected(this)' /><br /><br /><img onclick='expand(this)' src='down.png' width='25px' />"; 
    student.innerHTML = "Student " + cnt;
    advisor.innerHTML = "Teacher " + cnt;
    status.innerHTML = "Approved";
    semester.innerHTML = "Fall";
    type.innerHTML = "TA";
    budget.innerHTML = "12345";
    percentage.innerHTML = "100%";

    alert("Student " + cnt + " added successfully");
    
    cnt++;

  }
  catch(err) {
    alert(err.message);
  }
 
}

function expand(expandImg)
{
  var row = expandImg.parentNode.parentNode;
  var nextRow = row.nextElementSibling;

  var expandedRow = document.createElement("tr");
  var expandedCell = document.createElement("td");
  expandedCell.colSpan = "8"
  expandedCell.innerHTML = "Advisor:<br /><br /> Award Details<br /> Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />";
  expandedRow.appendChild(expandedCell);

        if (toggleExpand==true) {

          row.parentNode.insertBefore(expandedRow, nextRow);
          toggleExpand=false;

        } else {
           
          row.nextElementSibling.remove();
          toggleExpand=true;
        }
}

function selected(checkbox)
{ 
  
  var row = checkbox.parentNode.parentNode;
  var lastCol = row.cells.length;

  var delColumn = document.getElementById('delCol');
  var editColumn = document.getElementById('editCol');


  if(checkbox.checked == true){

    row.style.background="yellow";
    var deleteButton = row.insertCell(lastCol);
    deleteButton.innerHTML = "<button onclick='remove(this)'>Delete</button>";

    lastCol = row.cells.length;
    var editButton = row.insertCell(lastCol);
    editButton.innerHTML = "<img onclick='edit(this)' src='pencil.png' width='25px' />";

    delColumn.style.display = '';
    editColumn.style.display = '';
    document.getElementById("button").disabled = false;
    document.getElementById("button").style.background = "orange";
      document.getElementById("button").style.border = "orange";

  }
  else{

    row.style.background="none";
    row.deleteCell(lastCol -1);
    row.deleteCell(lastCol -2);
   
    var checked = false;
    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) 
    {
      if (checkboxes[i].checked) 
      {
        checked = true;
        break;
      }
    }
    if (checked == false) {
      delColumn.style.display = 'none';
      editColumn.style.display = 'none';
      document.getElementById("button").disabled = true;
      document.getElementById("button").style.background = "grey";
      document.getElementById("button").style.border = "grey";
    }
  }

}

function remove(removeRow)
{
  var row = removeRow.parentNode.parentNode;
  var index = row.rowIndex;
  var table = row.parentNode.parentNode;
  var nextRow = row.nextElementSibling;

  var student = row.cells[1].textContent;

  //console.log(student);

  
  row.nextElementSibling.remove();
  
  table.deleteRow(index);
  alert( student + " record deleted successfully");

  unselected();
  
}

function unselected()
{

  var delColumn = document.getElementById('delCol');
  var editColumn = document.getElementById('editCol');


  var checked = false;
    var checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) 
    {
      if (checkboxes[i].checked) 
      {
        checked = true;
        break;
      }
    }
    if (checked == false) {
      delColumn.style.display = 'none';
      editColumn.style.display = 'none';
      document.getElementById("button").disabled = true;
      document.getElementById("button").style.background = "grey";
      document.getElementById("button").style.border = "grey";
    }
  
}

function edit(editRow)
{
  var row = editRow.parentNode.parentNode;

  if(confirm("Edit details of " + row.cells[1].textContent + "\nAdvisor: " +  row.cells[2].textContent + "\nAward Status: " +  row.cells[3].textContent + "\nSemester: " +  row.cells[3].textContent + "\nType: " +  row.cells[4].textContent+ "\nBudget: " +  row.cells[5].textContent + "\nPercentage: " +  row.cells[6].textContent))
  {
    alert(row.cells[1].textContent + " data updated successfully");
  }

}


var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};


var t = new Title("CONNECT WITH ME!");