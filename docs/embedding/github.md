<div id="github" style="width: 402px; height: 346px"></div>

<script type="text/javascript">
var urlToGetAllOpenBugs = "https://api.github.com/9ci/repos/rcm/issues?state=open&labels=bug";

$(document).ready(function () {
    $.getJSON(urlToGetAllOpenBugs, function (allIssues) {
        $("div#github").append("found " + allIssues.length + " issues</br>");
        $.each(allIssues, function (i, issue) {
            console.log(issue)
            $("div#github")
                .append("<b>" + issue.number + " - " + issue.title + "</b></br>")
                .append("created at: " + issue.created_at + "</br>")
                .append(issue.body + "</br></br></br>");
        });
    });
});
</script>
