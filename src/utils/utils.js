import React from 'react';
import peopleJson from '../data/json/people.json';
import publicationsJson from '../data/json/publications.json';


// Takes in name in format FirstName LastName or FirstName MiddleName LastName,
// and returns the name in format F. Lastname or F. M. LastName
function name_format_helper(name) {
  let name_split = name.split(" ")
  for (var i = 0; i < name_split.length; i++) {
    if (i != name_split.length - 1) {
      name_split[i] = name_split[i][0] + "."
    }
  }
  return name_split.join(" ");
}

// Returns a JSX div of spans of authors that match the netIds given
// [PARAMS] peopleJson - the json to find matching data from
//          netIds - the array of netIds to be matcheda
export function getMatchingAuthors(netIds){
  netIds = netIds.map(id => (id.trim()));
  let allAuthors = peopleJson.entries;
  let entryAuthors = allAuthors.filter(function(value, index, arr){
    return (netIds.includes(value.netId.trim()));
  });
  let entryNetIds = entryAuthors.map(author => (author.netId));
  for (var i=0; i < netIds.length; i++) {
    if (netIds[i] === "kkarahal") {
      netIds[i] = "K. Karahalios";
    }
  }
  let authorList = netIds.map(
    (author) => entryNetIds.includes(author) ?
		  (entryAuthors[entryNetIds.indexOf(author)].pageUrl.length > 0 ?	
                    (<span className="Author"><a href={entryAuthors[entryNetIds.indexOf(author)].pageUrl}>
		        <b>{name_format_helper(entryAuthors[entryNetIds.indexOf(author)].name)}</b>, </a></span>) :
	            (<span className="Author">{entryAuthors[entryNetIds.indexOf(author)].name + ", "}</span>)
		  ) : 
		  (<span className="Author">{author + ", "}</span>)
  );
  let author = netIds[netIds.length - 1];
  console.log(netIds[netIds.length - 1])
  authorList[authorList.length - 1] = entryNetIds.includes(author) ?
		  (entryAuthors[entryNetIds.indexOf(author)].pageUrl.length > 0 ?	
                    (<span className="Author"><a href={entryAuthors[entryNetIds.indexOf(author)].pageUrl}>
		        <b>{name_format_helper(entryAuthors[entryNetIds.indexOf(author)].name)}</b> </a></span>) :
	            (<span className="Author">{entryAuthors[entryNetIds.indexOf(author)].name}</span>)
		  ) : 
		  (<span className="Author">{author}</span>)
  return(
    authorList
  );
}

//
// [PARAMS] num - number of most recent publications to return
//          projectId - the id of the project to search for related
//                      publications of
//          publicationsJson - the json to find matching data from
export function getTopPublications(num, projectId, publicationsJson){
  let allPublications = publicationsJson.entries;
  let matchingPubs = allPublications.filter(
    function(value, index, arr){
      return(value.projectId === projectId);
    }
  );

  matchingPubs.sort((a, b) => (a.year < b.year) ? 1 : -1);
  matchingPubs = matchingPubs.slice(0, 2);

  let pubList = matchingPubs.map(
    (pub) => <span key={matchingPubs.indexOf(pub)}>
                <a href={pub.url}>{pub.title}</a><br/>
             </span>
  );

  return(
    <div> {pubList} </div>
  );
}

// Same as getTopPublications, but returns all matching pubs
export function getMatchingPublications(projectId, publicationsJson){
  let allPublications = publicationsJson.entries;
  let matchingPubs = allPublications.filter(
    function(value, index, arr){
      return(value.projectId === projectId);
    }
  );

  let pubList = matchingPubs.map(
    (pub) => <span key={matchingPubs.indexOf(pub)}>
                <a href={pub.url}>{pub.title}</a><br/>
             </span>
  );

  return(
    <div> {pubList} </div>
  );
}


// topics: array of strings
// OUTDATED - this function returns the UNION of publications
//            that contain one or more of the topics
export function getMatchingPubsByTopics(topics){
  let allPublications = publicationsJson.entries;
  let matchingPubs = allPublications.filter(
    function(publication){
      let hasMatch = 0;
      topics.forEach(function(topic){
        hasMatch += publication.topics.includes(topic);
      });
      return (hasMatch > 0);
    }
  );

  matchingPubs.sort((a, b) => (a.year < b.year) ? 1 : -1);

  return matchingPubs;
}

// topic: a string representing a topic, or "ALL" for all topics
// CURRENT - returns all publications that have this topic tagged,
//           or every publication in the json if topic === "ALL"
export function getMatchingPubsByTopic(topic){
  let allPublications = publicationsJson.entries;


  if (topic === "All"){
    return allPublications;
  }

  let matchingPubs = allPublications.filter(
    function(publication){
      const equalTopi = (topi) => topi.trim() === topic;
      if (publication.topics.some(equalTopi)) {
        return true;
      }
      return false;
    }
  );

  matchingPubs.sort((a, b) => (a.year < b.year) ? 1 : -1);

  return matchingPubs;
}
