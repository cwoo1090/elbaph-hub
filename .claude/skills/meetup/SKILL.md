---
name: meetup
description: Meetup reminders and scheduling for Elbaph Slack. Posts reminders to #meetups channel. Trigger with "/meetup", "meetup reminder", "meetup schedule".
disable-model-invocation: true
---

# Meetup Reminders

When invoked, follow these steps:

1. Read [reference.md](reference.md) for schedule, reminder rules, and format
2. Determine what action is needed based on the current date and next meetup
3. Post the appropriate reminder to #meetups channel (`C0AA6BW3ERW`) via Slack MCP
4. Save the reminder to `archive/YYYY-MM-DD.md`

Supported actions:
- **Topic call**: 2 weeks before meetup — ask members to submit their topics
- **Reminder**: 1 day before meetup — final reminder with time, topics, location
- **Custom**: If user specifies a message, format and post it
