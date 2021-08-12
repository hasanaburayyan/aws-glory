package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"encoding/json"
	"os"
)

type Participant struct {
	Name string `json:"Name"`
	Certs []string `json:"Certs"`
}

type Certificate struct {
	Name string
	Level string
}

type GloryData struct {
	Participants []Participant
	Certificates []Certificate
}

func (p Participant) HasCertificate(certificate Certificate) bool {
	for _, cert := range p.Certs {
		if cert == certificate.Name {
			return true
		}
	}
	return false
}

func main() {
	var participants []Participant
	certificates := []Certificate{
		{Name: "Cloud Practitioner"},
		{Name: "Developer", Level: "Associate"},
		{Name: "SysOps Administrator", Level: "Associate"},
		{Name: "Solutions Architect", Level: "Associate"},
		{Name: "DevOps Engineer", Level: "Professional"},
		{Name: "Solutions Architect", Level: "Professional"},
		{Name: "Advanced Networking", Level: "Specialty"},
		{Name: "Database", Level: "Specialty"},
		{Name: "Security", Level: "Specialty"},
		{Name: "Data Analytics", Level: "Specialty"},
		{Name: "Machine Learning", Level: "Specialty"},
	}

	files, err := ioutil.ReadDir("participants")
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		participant := readParticipantFile(fmt.Sprintf("participants/%s", f.Name()))
		fmt.Printf("Adding Participant: %s\n", participant.Name)
		participants = append(participants, participant)
	}


	gloryData:= GloryData{
		Participants: participants,
		Certificates: certificates,
	}

	templates := template.Must(template.ParseFiles("templates/index.gohtml"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if err := templates.ExecuteTemplate(w, "index.gohtml", gloryData); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	fmt.Println("Listening")
	fmt.Println(http.ListenAndServe(":8080", nil))
}


func readParticipantFile(fName string) Participant {
	jsonFile, err := os.Open(fName)
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	bytValue, _ := ioutil.ReadAll(jsonFile)

	var participant Participant

	json.Unmarshal(bytValue, &participant)

	return  participant
}