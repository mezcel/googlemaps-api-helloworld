$(document).ready(function(){
    // The event listener for the file upload
    document.getElementById('csvFileUpload').addEventListener('change', uploadcsv, false);

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload()
    {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob)
        {
            isCompatible = true;
        }
        return isCompatible;
    }
    // Method that reads and processes the selected file
    function uploadcsv(evt)
    {
        if (!browserSupportFileUpload())
        {
            alert('The File APIs are not fully supported in this browser!');
        }
        else
        {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event)
            {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                locations = data; //locations var pulled from scripts/myScript.js
                console.log(locations);
                if (data && data.length > 0)
                {
                    alert('Imported -' + data.length + '- waypoints successfully!');
                    location.href='#parallaxnav'; //jumps to where id=#parallaxnav is on the html
                }
                else
                {
                    alert('No data to import!');
                }
                csv2googlepoints(); //argument sub pulled from scripts/myScript.js
            };
            reader.onerror = function()
            {
                alert('Unable to read ' + file.fileName);
            };
        }
    }
});
