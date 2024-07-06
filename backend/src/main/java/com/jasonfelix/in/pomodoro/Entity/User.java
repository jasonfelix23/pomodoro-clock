package com.jasonfelix.in.pomodoro.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "email_address", nullable = false)
    private String emailAddress;

    @Column(name = "pomo_session_duration")
    private int pomoSessionDuration;

    @Column(name = "pomo_session_break")
    private int pomoSessionBreak;

    @Column(name = "total_sessions")
    private int totalSessions;

    @Column(name="total_tasks")
    private int totalTasks;

    public User(){

    }

    public User(String firstName, String emailAddress, int pomoSessionDuration, int pomoSessionBreak){
        this.firstName = firstName;
        this.emailAddress = emailAddress;
        this.pomoSessionBreak = pomoSessionBreak;
        this.pomoSessionDuration = pomoSessionDuration;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public int getPomoSessionDuration() {
        return pomoSessionDuration;
    }

    public void setPomoSessionDuration(int pomoSessionDuration) {
        this.pomoSessionDuration = pomoSessionDuration;
    }

    public int getPomoSessionBreak() {
        return pomoSessionBreak;
    }

    public void setPomoSessionBreak(int pomoSessionBreak) {
        this.pomoSessionBreak = pomoSessionBreak;
    }

    public int getTotalSessions() {
        return totalSessions;
    }

    public void setTotalSessions(int totalSessions) {
        this.totalSessions = totalSessions;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }
}
